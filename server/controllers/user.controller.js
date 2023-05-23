const User = require('../models/users.model');
const createTokenAndSend = require('../helpers/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).send('User already exists');
        }

        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json(newUser);

        createTokenAndSend(newUser, res);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send('Invalid username or password');
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid username or password');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.json(user);

        createTokenAndSend(user, res);
    } catch (error) {
        next(error);
    }
};

const getUser = (req, res) => {
    const userId = req.user.id;

    User.findById(userId)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        });
};

const logOut = (req, res) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
}

module.exports = { registerUser, loginUser, logOut, getUser };
