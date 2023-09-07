const User = require('../../models/User.model');

const deleteUserService = async (userId) => {
    const user = await User.findOne({ _id: userId }).exec();
    if (!user) {
        return{
            error: 'No user found'
        }
    }

    const result = await User.deleteOne({ _id: userId });
    return {
        result
    }
};

module.exports = { deleteUserService };
