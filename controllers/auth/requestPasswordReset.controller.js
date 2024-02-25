const requestPasswordReset = require('../../services/auth/requestPasswordReset.service');

const requestPasswordResetController = async (req, res) => {
    const requestPasswordResetResponse = await requestPasswordReset(
        req.body.email
    );

    return res.json(requestPasswordResetResponse);
};

module.exports = requestPasswordResetController;