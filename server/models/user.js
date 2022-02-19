const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true]
    },
    username: {
        type: String,
        unique: [true],
        required: [true]
    },
    email: {
        type: String,
        required: [true],
        unique: true
    },
    password: {
        type: String,
        required: [true],
        select: false
    }
});

UserSchema.method("matchPassword", async function (password) {
    return await bcrypt.compare(password, this.password);
});

UserSchema.method("getSignedToken", async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE});
});


module.exports = mongoose.model("User", UserSchema);



