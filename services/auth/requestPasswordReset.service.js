const Token = require('../../models/Token.model');
const User = require('../../models/User.model');
const bycrypt = require('bcrypt');
const sendEmail = require('../../utils/email/sendEmail');
const crypto = require('crypto');

const clientURL = process.env.CLIENT_URL;

const requestPasswordReset = async (email) => {
    let user = await User.findOne({ email }).exec();

    if (!user) {
        return {
            message: 'User not found',
            status: 404
        }
    }

    let token = await Token.findOne({ userId: user._id }).exec();

    if (token) {
        await token.deleteOne();
    }

    let resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bycrypt.hash(resetToken, 10);

    await new Token({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now()
    }).save();

    const link = `${clientURL}/auth/passwordReset?token=${resetToken}&id=${user._id}`;

    sendEmail(
        user.email,
        "Password Reset Request",
        {
            name: user.username,
            link: link
        },
        "./template/resetRequestPassword.handlebars"
    );

    return {
        status: 200,
        message: 'Password reset link has been sent to your email account',
        link: link
    }
}

module.exports = requestPasswordReset;

