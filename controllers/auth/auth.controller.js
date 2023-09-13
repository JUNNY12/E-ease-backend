const { loginUser } = require('../../services/auth/auth.service');


const loginController = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username or password is missing' });
    }
    const response = await loginUser(username, password);

    if (response.error) {
        return res.status(401).json({ message: response.error });
    }

    const { accessToken, refreshToken, userInfo } = response;

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
    }); // for production

    // console.log(res)
    res.json({ accessToken, userInfo });
}

module.exports = {
    loginController
}
