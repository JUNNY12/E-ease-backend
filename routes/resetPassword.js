const resetPassword = require('../controllers/auth/resetPassword.controller');
const router = require('express').Router();

router.post('/', resetPassword);

module.exports = router;