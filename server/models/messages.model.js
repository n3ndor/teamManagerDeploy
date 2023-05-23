const mongoose = require('mongoose');
const validator = require('validator');

const MessageSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please enter your name');
            }
        },
    },
    text: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Message text cannot be empty');
            }
        },
    },
});

module.exports = mongoose.model('Message', MessageSchema);
