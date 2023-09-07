const { getAllUsers } = require('../../services/user/getUser.service');
const { deleteUserService } = require('../../services/user/deleteUser.service');
const ROLES_LIST = require('../../config/roles.cofig');
const { updateDetails } = require('../../services/user/updateUser.service');

const getAllUser = async (req, res) => {
    const users = await getAllUsers();

    if (!users) return res.status(204).json({ message: 'Users not found' });
    const usersArray = users.map(user => {
        const {
            _id,
            username,
            email,
            phoneNumber,
            firstName,
            lastName,
            roles,
            refreshToken,
            address,
            createdAt,
            updatedAt,
        } = user;
        return {
            _id,
            username,
            email,
            phoneNumber,
            firstName,
            lastName,
            roles,
            refreshToken,
            address,
            createdAt,
            updatedAt
        }
    });

    res.status(200).json(usersArray);
};

const deleteUser = async (req, res) => {
    const { id } = req.body;
    const { result, error } = await deleteUserService(id);

    if (error) {
        res.status(204).json({ error });
    }

    res.status(200).json(result);
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const adminRole = ROLES_LIST.Admin
    const rolesArray = req.roles;
    const reqId = req.id;

    const isAdmin = rolesArray.includes(adminRole);

    if (!isAdmin && req.body.password) {
        res.status(403).json({ error: 'You are not authorized to perform this action' });
        return;
    }

    if (isAdmin || reqId === id) {
        const { error, success } = await updateDetails(id, req.body);

        if (error) {
            res.status(204).json({ error });
            return;
        }

        res.status(200).json({ success });
    }

    else {
        res.status(403).json({ error: 'You are not authorized to perform this action' });
    }

}

module.exports = {
    getAllUser,
    deleteUser,
    updateUser,
}


