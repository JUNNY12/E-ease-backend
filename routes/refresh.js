const express = require('express');
const router = express.Router();
const {handleRefreshToken} = require('../controllers/auth/refreshtoken.controller')

router.post('/', handleRefreshToken);

module.exports = router;