const {rateLimit} = require ('express-rate-limit')

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100 ,
    message: 'Too many request from this IP, please try again in 10min',
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

module.exports = {limiter}