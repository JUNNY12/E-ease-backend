const User = require('../../models/User.model');

const logoutUser = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204) //no content
    const refreshToken = cookies.jwt;

    //is refreshToken in the db
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite:'None'});
        return res.sendStatus(204); //forbidden
    }
    
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite:'None'}); //on production set secure: true
    res.sendStatus(204); //no content
};

module.exports = { logoutUser };