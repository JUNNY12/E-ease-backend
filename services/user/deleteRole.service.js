const User = require('../../models/User.model');
const ROLES_LIST = require('../../config/roles.cofig');

const deleteRole = async (userId, role) => {
    try {
        const foundUser = await User.findById(userId).exec();

        if (!foundUser) return { error: 'User not found' };

        const foundRole = ROLES_LIST[role];

        if (!foundRole) return { error: 'Invalid role specified' };

        // Create a new object without the specified role
        const updatedRoles = { ...foundUser.roles };

        // Delete the specified role
        delete updatedRoles[role];

        // Set the updated roles object
        foundUser.roles = updatedRoles;

        await foundUser.save();

        return { success: 'Role deleted successfully' };
    } catch (error) {
        console.error(error);
        return { error: 'An error occurred while deleting role' };
    }
};

module.exports = { deleteRole };
