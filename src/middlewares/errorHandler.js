const response = require('../utils/response');

module.exports = (err, req, res, next) => {
    console.error(err);

    return response.error(
        res,
        err.message || 'Internal Server Error',
        err.status || 500
    );
};