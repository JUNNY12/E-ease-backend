const jwt = require('jsonwebtoken');
const User = require('../../models/User.model');

const handleRefreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.sendStatus(401);

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403);
    
    // Verify the refresh token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || decoded.username !== foundUser.username) {
                return res.sendStatus(403);
            }
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        id: foundUser._id,
                        username: foundUser.username,
                        roles: Object.values(foundUser.roles),
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '5m',
                }
            );

            res.json({ accessToken });
        }
    );
}

module.exports = { handleRefreshToken }