const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    
     if (req.originalUrl === '/' || '/status' && req.method === 'GET') {
        return next();
    }

    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decodedToken) => {
            if(err) return res.sendStatus(403);
            req.id = decodedToken.UserInfo.id;
            req.username = decodedToken.UserInfo.username;
            req.roles = decodedToken.UserInfo.roles;
            next();
        }
    )
}


module.exports = verifyJWT;