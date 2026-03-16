exports.success = (res, data = null, message = null, status = 200) => {
    return res.status(status).json({
        success: true,
        data,
        message,
        error: null
    });
};

exports.error = (res, message = 'Internal server error', status = 500) => {
    return res.status(status).json({
        success: false,
        data: null,
        message: null,
        error: message
    });
};