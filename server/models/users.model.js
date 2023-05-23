const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Please type in your First and Last Name"]
    },
    userName: {
        type: String,
        required: [true, "User Name is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

UserSchema.plugin(uniqueValidator, { message: 'User Name must be unique.' });

module.exports = mongoose.model("User", UserSchema);