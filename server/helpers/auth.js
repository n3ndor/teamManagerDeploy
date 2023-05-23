const jwt = require('jsonwebtoken');

function createTokenAndSend(user, res) {
    // Create a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send back token and user
    res.cookie('token', token, { httpOnly: true });
    res.json(user);
}

module.exports = createTokenAndSend;
