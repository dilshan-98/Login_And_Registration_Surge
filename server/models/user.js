const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true]
    },
    username: {
        type: String,
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


module.exports = mongoose.model("User", UserSchema);



