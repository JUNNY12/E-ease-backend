const User = require('../../models/User.model')
const bycrypt = require('bcrypt')


const registerUser  = async ({username, email,password}) => {

    const hashedPassword = await bycrypt.hash(password, 10);

    const result = await User.create({
        username,
        email,
        password: hashedPassword,
    });

}


module.exports = registerUser;