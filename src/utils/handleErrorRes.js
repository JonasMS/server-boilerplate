const handleErrorRes = (res, err = {}) => {
    res.status(err.statusCode || 500).json({
        error: {
            errorCode: err.errorCode,
            message: err.message,
            stack: err.stack,
        },
    });
};

module.exports = handleErrorRes;
