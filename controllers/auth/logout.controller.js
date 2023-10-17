const User = require('../../models/User.model');

const logoutUser = async (req, res) => {

    const {refreshToken} = req.body;

    if(!refreshToken) return res.sendStatus(401); //unauthorized

    //is refreshToken in the db
    const foundUser = await User.findOne({ refreshToken }).exec();
    
    foundUser.refreshToken = '';
    const result = await foundUser.save();
    
    res.sendStatus(204); 
};

module.exports = { logoutUser };