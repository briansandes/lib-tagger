const fs = require('fs');
const path = require('path');
const { createLogger, format, transports } = require('winston');

const logDir = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const date = new Date().toISOString().split('T')[0];
const logFile = path.join(logDir, `${date}.log`);

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack, ...meta }) => {
      return `${timestamp} [${level.toUpperCase()}] ${stack || message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ''
      }`;
    })
  ),
  transports: [
    new transports.File({ filename: logFile }),
    new transports.Console()
  ]
});


// ---------- request-aware helpers ----------

logger.reqInfo = (req, message, meta = {}) => {
  logger.info(`[req:${req.id}] ${message}`, meta);
};

logger.reqWarn = (req, message, meta = {}) => {
  logger.warn(`[req:${req.id}] ${message}`, meta);
};

logger.reqError = (req, err) => {
  logger.error(`[req:${req.id}] ${err.stack || err.message}`);
};


module.exports = logger;