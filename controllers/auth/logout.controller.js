const User = require('../../models/User.model');

const logoutUser = async (req, res) => {

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204) //no content
    const refreshToken = cookies.jwt;

    //is refreshToken in the db
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite:'None', maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204);
    }
    
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    // res.clearCookie('jwt', { httpOnly: true, sameSite:'None', maxAge: 24 * 60 * 60 * 1000});
     res.clearCookie('jwt', refreshToken, { httpOnly: true , sameSite: 'none' , secure:true,  maxAge: 24 * 60 * 60 * 1000}); // for production
    res.sendStatus(204); 
};

module.exports = { logoutUser };