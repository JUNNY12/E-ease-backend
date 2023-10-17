const User = require('../../models/User.model');

const getAllUsers = async () => {
    const users = await User.find().exec();
    return users;
};

const getUserById = async (id) => {
    const user = await User.findById(id).exec();

    if (!user) {
        return {
            error: 'User not found',
        };
    }

    return {
        user:{
            _id: user._id,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            createdAt:user.createdAt,
            signedIn:user.signedIn,
        }
    }
    
}

module.exports = { getAllUsers, getUserById };
