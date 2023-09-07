const express = require('express');
const router = express.Router();
const {loginController} = require('../controllers/auth/auth.controller');

router.post('/', loginController);

module.exports = router;