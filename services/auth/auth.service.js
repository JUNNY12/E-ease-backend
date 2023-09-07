const User = require('../../models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginUser = async (username, password) => {
    const foundUser = await User.findOne({ username: username }).exec();

    if (!foundUser) {
        return { error: 'User does not exist' };
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (isPasswordCorrect) {
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": foundUser._id,
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m' }
        )
        const refreshToken = jwt.sign(
            {
                "username": foundUser.username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        const {_id, username, email, createdAt } = result;
        return { accessToken, refreshToken, userInfo:{_id, username, email, createdAt}};
    }
    else {
        return { error: 'Authentication failed' };
    }



}

module.exports = { loginUser };

