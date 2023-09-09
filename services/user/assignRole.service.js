const User = require('../../models/User.model');
const ROLES_LIST = require('../../config/roles.cofig');

const assignRole = async (userId, newRole) => {
    try{
        const foundUser = await User.findById(userId).exec();
        if(!foundUser) return {error: 'User not found'};

        const foundRole = ROLES_LIST[newRole];
        if(!foundRole) return {error: 'Invalid role specified'};

        foundUser.roles[newRole] = ROLES_LIST[newRole];
        await foundUser.save();
        
        return{success: 'Role assigned successfully'};
    }
    catch(error){
        console.error(error);
        return {error: 'An error occurred while assigning role'};
    }
}   

module.exports = {assignRole};