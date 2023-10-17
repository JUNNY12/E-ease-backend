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
        const userRoles = Object.values(foundUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "id": foundUser._id,
                    "username": foundUser.username,
                    "roles": userRoles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5m' }
        )
        const refreshToken = jwt.sign(
            {
                "username": foundUser.username,
            },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const date = new Date()
        const now = date.getTime();
        
        foundUser.refreshToken = refreshToken;
        foundUser.signedIn = now;

        const result = await foundUser.save();
        const {_id, username, email, createdAt, roles } = result;
        return { accessToken, refreshToken, userInfo:{_id, username, email, createdAt, roles}};
    }
    else {
        return { error: 'Authentication failed: Password is incorrect' };
    }

}

module.exports = { loginUser };

