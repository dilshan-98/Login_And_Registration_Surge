const mongoose = require("mongoose");
const User = mongoose.model("User");
const errorResponse = require("../utils/errorResponse");
const bcrypt = require("bcryptjs");


exports.register = async (req, res, next) => {
    const emailRegex =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    try {

        const { fullname, username, email, password } = req.body;

        if (!(fullname || email || username || password)) {
            return next(new errorResponse("Fields cannot be empty", 400));
        }

        if (email.length > 254) {
            return next(new errorResponse("Invalid Email", 400));
        }

        const validEmail = emailRegex.test(email);

        if (!validEmail) {
            return next(new errorResponse("Invalid Email", 400));
        }

        var validPassword = passwordRegex.test(password);

        if (!validPassword) {
            return next(new errorResponse("Password must contain minimum 8 characters, one UPPERCASE letter, one lowercase letter, one number and one special character", 400));
        }

        const existsEmail = await User.findOne({ email });
        if (existsEmail) {
            return next(new errorResponse("User Already Exists", 400));
        }

        const existsUname = await User.findOne({ username });
        if (existsUname) {
            return next(new errorResponse("Select Different Username", 400));
        }

        const salt = await bcrypt.genSalt(10);

        const passwordEncrypted = await bcrypt.hash(password, salt);

        const user = await User.create({ fullname, username, email, password: passwordEncrypted });

        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    const emailRegex =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new errorResponse("Please provide email or password", 400));
        }

        if (email.length > 254) {
            return next(new errorResponse("Invalid Email", 400));
        }

        const validEmail = emailRegex.test(email);

        if (!validEmail) {
            return next(new errorResponse("Invalid Email", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new errorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new errorResponse("Invalid credentials", 401));
        }

        //retrieve data without the password
        const definiteuser = await User.findOne({ email });

        sendToken(definiteuser, 200, res);

    } catch (error) {
        next(error);
    }
};

exports.userDetails = async (req, res, next) => {

    try {
        const id = req.user._id;

        const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });

        res.status(200).json({ success: true, data: {username: user.username, fullname: user.fullname} });
    } catch (error) {
        next(error);
    }

};

exports.profileUpdate = async (req, res, next) => {
    const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    try {
        //had to split user id to be defined in the findOne method since for some reason data returned from the db did not match the req.user._id when coded as in usual way
        const id = req.user._id;

        const user = await User.findOne({ _id: mongoose.Types.ObjectId(id) });

        console.log(user);;

        if (!user) {
            return next(new errorResponse("User unidentified", 404));
        }

        user.fullname = req.body.fullname || user.fullname;
        user.username = req.body.username || user.username;

        if (req.body.password) {
            var validPassword = passwordRegex.test(req.body.password);

            if (!validPassword) {
                return next(new errorResponse("Password must contain minimum 8 characters, one UPPERCASE letter, one lowercase letter, one number and one special character", 400));
            }

            const salt = await bcrypt.genSalt(10);

            const passwordEncrypted = await bcrypt.hash(req.body.password, salt);

            user.password = passwordEncrypted;
        }

        await user.save();

        sendToken(user, 201, res);

    } catch (error) {
        next(error);
    }
}

const sendToken = async (user, statusCode, res) => {
    const token = await user.getSignedToken();
    res.status(statusCode).json({ success: true, token, user });
}