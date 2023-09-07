const User = require('../../models/User.model');

const getAllUsers = async () => {
    const users = await User.find().exec();
    return users;
};

module.exports = { getAllUsers};
