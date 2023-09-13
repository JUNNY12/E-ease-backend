const allowedOrigins = require('./allowed.origin.config');

const corsOptions = {
    origin:(origin, callback) => {
        if(allowedOrigins.indexOf(origin) === -1) {
            callback(null, true)
        }
        else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionSuccessStatus: 200,
    credentials:true
};

module.exports = corsOptions;