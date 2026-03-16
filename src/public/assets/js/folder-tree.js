const imageExt = ["jpg", "jpeg", "png", "gif", "webp"]
const videoExt = ["mp4", "mov", "avi", "webm"]
const textExt = ["txt", "md", "log", "json"]

function buildTree(assets) {

    const tree = {}

    assets.forEach(asset => {

        const parts = asset.path.split("/").filter(Boolean)

        let current = tree

        parts.forEach(p => {

            if (!current[p]) current[p] = {}

            current = current[p]

        })

    })

    return tree

}


/*
------------------------------------------
FILE TYPE DETECTION
------------------------------------------
*/

function getType(filename) {

    const ext = filename.split(".").pop().toLowerCase()

    if (imageExt.includes(ext)) return "image"
    if (videoExt.includes(ext)) return "video"

    return "text"

}

/*
------------------------------------------
ICONS
------------------------------------------
*/

function icon(type) {

    if (type === "image") return '<div class="file-icon icon-image">🖼</div>'
    if (type === "video") return '<div class="file-icon icon-video">🎬</div>'

    return '<div class="file-icon icon-text">📄</div>'

}

/*
------------------------------------------
RENDER FILE GRID
------------------------------------------
*/

function displayFiles(folder) {

    document.getElementById("folderTitle").innerText = folder

    const grid = document.getElementById("fileGrid")

    grid.innerHTML = ""

    const list = folderFiles[folder] || []

    let i = 0;
    list.forEach(asset => {

        const type = getType(asset.filename)

        const card = document.createElement("div")
        card.className = "file-card"
        card.tabIndex = i;

        card.innerHTML = `

${icon(type)}

<div class="filename" title="${asset.filename}">${asset.filename}</div>

`

        grid.appendChild(card)
        i++;
    })

}

/*
------------------------------------------
RENDER SIDEBAR TREE
------------------------------------------
*/

function renderTree(obj, parent, path = "") {

    Object.keys(obj).sort().forEach(key => {

        const full = path ? path + "/" + key : key

        const row = document.createElement("div")
        row.className = "folder"

        row.innerHTML = "📁 " + key

        const children = document.createElement("div")
        children.className = "children"

        row.onclick = (e) => {

            e.stopPropagation()

            children.style.display =
                children.style.display === "block" ? "none" : "block"

            displayFiles(full)

        }

        parent.appendChild(row)
        parent.appendChild(children)

        renderTree(obj[key], children, full)

    })

}