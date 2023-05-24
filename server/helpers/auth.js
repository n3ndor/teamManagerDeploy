const jwt = require('jsonwebtoken');

function createTokenAndSend(user, res) {
    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send back token and user
    res.cookie('token', token, { httpOnly: true });
    user = user.toObject();
    delete user['password'];
    res.json({ user: user, token: token });
}

module.exports = createTokenAndSend;
