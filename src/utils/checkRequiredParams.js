module.exports = (req, reqParams, params = []) => {
    return new Promise((resolve, reject) => {
        const missingParams = params.filter((param) => {
            return !reqParams[param];
        });

        if (missingParams.length) {
            reject({
                statusCode: 422,
                message: `Missing required '${missingParams[0]}' parameter.`,
            });
        }

        resolve(req);
    });
};
