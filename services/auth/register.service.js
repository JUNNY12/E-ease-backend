const bycrypt = require('bcrypt')
const User = require('../../models/User.model')
const jwt = require('jsonwebtoken');
const Token = require('../../models/Token.model');
const sendEmail = require('../../utils/email/sendEmail');



const registerUser = async ({ username, email, password }) => {

    const hashedPassword = await bycrypt.hash(password, 10);
    const token = jwt.sign({ username, email }, process.env.JWT_SECRET);

    const result = await User.create({
        username,
        email,
        password: hashedPassword,
    });

    await Token.create({
        userId: result._id,
        token
    });

    const link = `${process.env.CLIENT_URL}/account`;

    sendEmail(
        email,
        "Welcome to our platform! Please login your E-ease account!",
        {
            name: username,
            link
        },
        "./template/welcome.handlebars"
    );

    return { link }
}


module.exports = registerUser;