const resetPassword = require('../../services/auth/resetPassword.service');

const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
        req.body.userId,
        req.body.token,
        req.body.password
    );
    return res.json(resetPasswordService);
};

module.exports = resetPasswordController;