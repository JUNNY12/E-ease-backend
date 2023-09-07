const User = require('../../models/User.model');
const bcrypt = require('bcrypt');

const updateDetails = async (userId, updates) => {
    const { password, ...otherUpdates } = updates;

    const foundUser = await User.findById(userId).exec();

    if (!foundUser) {
        return { error: 'User does not exist' };
    }

    Object.assign(foundUser, otherUpdates);

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        foundUser.password = hashedPassword;
    }

    await foundUser.save();

    return { success: 'User details updated successfully' };
};

module.exports = { updateDetails };
