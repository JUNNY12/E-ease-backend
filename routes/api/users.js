const {getAllUser, deleteUser, updateUser}  = require('../../controllers/user/user.controller')
const express = require('express');
const router = express.Router();
const {verifyRoles} = require('../../middleware/verify.roles');
const ROLES_LIST = require('../../config/roles.cofig');

router.route('/')
.get(verifyRoles(ROLES_LIST.Admin),getAllUser)
.delete(verifyRoles(ROLES_LIST.Admin),deleteUser);


router.route('/:id')
.put(updateUser);

module.exports = router;