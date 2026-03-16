// ./utils/fileCrawler.js
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const sharp = require("sharp");
const ffmpeg = require("fluent-ffmpeg");

// Configure your extensions
const imageExts = ["jpg", "jpeg", "png", "gif", "webp", "avif"];
const videoExts = ["mp4", "mov", "avi", "webm"];
const textExts = ["txt", "pdf", "doc", "docx"];

/**
 * Compute file checksum
 * @param {string} filePath 
 * @param {string} algorithm 
 */
function getChecksum(filePath, algorithm = "md5") {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algorithm);
        const stream = fs.createReadStream(filePath);
        stream.on("error", reject);
        stream.on("data", chunk => hash.update(chunk));
        stream.on("end", () => resolve(hash.digest("hex")));
    });
}

/**
 * Get video metadata (length and dimensions)
 * @param {string} filePath 
 */
function getVideoMetadata(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) return reject(err);
            const videoStream = metadata.streams.find(s => s.codec_type === "video");
            if (!videoStream) return resolve({ length: null, dimensions: null });
            const { duration, width, height } = videoStream;
            resolve({
                length: duration ? Math.floor(duration) : null,
                dimensions: width && height ? `${width}x${height}` : null,
            });
        });
    });
}

/**
 * Get image dimensions
 * @param {string} filePath 
 */
async function getImageDimensions(filePath) {
    try {
        const metadata = await sharp(filePath).metadata();
        return metadata.width && metadata.height ? `${metadata.width}x${metadata.height}` : null;
    } catch {
        return null;
    }
}

/**
 * Recursively crawl a directory and return file data
 * @param {string} basePath 
 * @param {string} relativePath 
 */
async function crawlDir(basePath, relativePath = "") {
    const absPath = path.join(basePath, relativePath);
    const items = fs.readdirSync(absPath, { withFileTypes: true });
    let results = [];

    for (const item of items) {
        const itemRelPath = path.join(relativePath, item.name);
        const itemAbsPath = path.join(basePath, itemRelPath);

        if (item.isDirectory()) {
            const subResults = await crawlDir(basePath, itemRelPath);
            results = results.concat(subResults);
        } else if (item.isFile()) {
            const ext = path.extname(item.name).slice(1).toLowerCase();
            let type = null;
            if (imageExts.includes(ext)) type = "image";
            else if (videoExts.includes(ext)) type = "video";
            else if (textExts.includes(ext)) type = "text";
            else continue;

            let folderPath = relativePath.replace(/\\/g, "/");
            if (folderPath.length > 0 && !folderPath.endsWith("/")) folderPath += "/";

            const fileData = {
                path: folderPath,
                filename: item.name,
                extension: ext,
                type,
                length: null,
                dimensions: null,
                checksum: await getChecksum(itemAbsPath),
            };

            if (type === "image") {
                fileData.dimensions = await getImageDimensions(itemAbsPath);
            } else if (type === "video") {
                const videoMeta = await getVideoMetadata(itemAbsPath);
                fileData.length = videoMeta.length;
                fileData.dimensions = videoMeta.dimensions;
            }

            results.push(fileData);
        }
    }

    return results;
}

// Export as module
module.exports = {
    crawlDir,
};