const {getAllUser, deleteUser, updateUser, assignUserRole, deleteUserRole, getUser}  = require('../../controllers/user/user.controller')
const express = require('express');
const router = express.Router();
const {verifyRoles} = require('../../middleware/verify.roles');
const ROLES_LIST = require('../../config/roles.cofig');

router.route('/')
.get(verifyRoles(ROLES_LIST.SuperAdmin, ROLES_LIST.Admin),getAllUser)
.delete(verifyRoles(ROLES_LIST.SuperAdmin, ROLES_LIST.Admin),deleteUser);


router.route('/:id')
.put(updateUser)
.get(getUser);

router.route('/role/:id')
.put(verifyRoles(ROLES_LIST.SuperAdmin),assignUserRole)
.delete(verifyRoles(ROLES_LIST.SuperAdmin),deleteUserRole)

module.exports = router;