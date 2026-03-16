const logger = require('../utils/logger');
const response = require('../utils/response');

module.exports = (err, req, res, next) => {

  if (err.status && err.status < 500) {
    logger.reqWarn(req, err.message);
  } else {
    logger.reqError(req, err);
  }

  return response.error(
    res,
    err.message || 'Internal Server Error',
    err.status || 500
  );
};