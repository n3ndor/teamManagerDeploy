const jwtError = function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ message: 'invalid token' });
    }
};

module.exports = jwtError;