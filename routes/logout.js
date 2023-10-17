const express = require('express');
const router = express.Router();
const {logoutUser} = require('../controllers/auth/logout.controller');

router.post('/', logoutUser);

module.exports = router;