const User = require('../../models/User.model');
const Token = require('../../models/Token.model');
const sendEmail = require('../../utils/email/sendEmail');
const bycrypt = require('bcrypt');

const resetPassword = async (userId, token, Password) => {
    let passwordResetToken = await Token.findOne({ userId }).exec();

    if (!token) {
        return { message: 'Invalid or expired token' }
    }

    console.log(passwordResetToken.token);

    const isValid = await bycrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
        return { message: 'Invalid or expired token' }
    }
    const bycryptSalt = process.env.BCRYPT_SALT;
    const hash = await bycrypt.hash(Password, Number(bycryptSalt));
    
    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    );

    const user = await User.findById({_id:userId});

    sendEmail(
        user.email,
        "Password Reset Successfull",
        {
            name: user.username
        },
        "./template/resetPassword.handlebars"
    );

    await passwordResetToken.deleteOne();

    return { message: 'Password reset successfull' }
}

module.exports = resetPassword;