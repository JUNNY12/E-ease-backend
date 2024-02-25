const User = require('../../models/User.model');
const registerUser = require('../../services/auth/register.service');


const registerController = async (req, res) => {
    const { username, email, password } = req.body;

    const existingUsername = await User.findOne({ username }).exec();
    const existingEmail = await User.findOne({ email }).exec();

    if (existingUsername || existingEmail) {
        return res.status(409).json({ message: 'Username or email already in use' })
    }

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'username, email, and password are required' })
    }

    const newUser = await registerUser({ username, email, password });

    res.status(201).json({ message: 'User created', user: newUser })
};

module.exports = registerController;