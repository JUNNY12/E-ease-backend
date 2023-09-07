const express = require('express');
const router = express.Router();
const {handleRefreshToken} = require('../controllers/auth/refreshtoken.controller')

router.get('/', handleRefreshToken);

module.exports = router;