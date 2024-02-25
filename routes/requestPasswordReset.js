const requestPasswordResetController = require('../controllers/auth/requestPasswordReset.controller');
const router = require('express').Router();

router.post('/', requestPasswordResetController); 

module.exports = router;
