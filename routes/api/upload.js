const express = require('express');
const router = express.Router();
const {  verifyRoles} = require('../../middleware/verify.roles');
const verifyJwt = require('../../middleware/verify.jwt')
const {uploadController, deleteContoller} = require("../../controllers/upload/upload.controller")
const upload = require('../../middleware/multer');
const ROLES_LIST = require('../../config/roles.cofig');

router.route('/')
    .post(upload.single('my_file'), uploadController);

router.route('/delete')
    .post(deleteContoller);
    
module.exports = router;