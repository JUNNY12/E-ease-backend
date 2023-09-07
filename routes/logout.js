const express = require('express');
const router = express.Router();
const {logoutUser} = require('../controllers/auth/logout.controller');

router.get('/', logoutUser);

module.exports = router;