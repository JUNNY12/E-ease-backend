const express = require('express');
const router = express.Router();
const registerController = require('../controllers/auth/register.controller');

router.post('/', registerController);

module.exports = router;