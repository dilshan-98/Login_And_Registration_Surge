const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
    const { fullname, username, email, password } = req.body;

    const emailRegex =
        /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    if (fullname || email || username || password) {
        return next(new errorResponse("Fields cannot be empty!!!", 400));
    }

    if (email.length > 254) {
        return res.status(400).send({ message: "Invalid Email!!!" });
    }

    const validEmail = emailRegex.test(email);

    if (!validEmail) {
        return res.status(400).send({ message: "Invalid Email!!!" });
    }

    var validPassword = passwordRegex.test(password);

    if (!validPassword) {
        return res.status(400).send({
            message:
                "Password must contain minimum 8 characters, one UPPERCASE letter, one lowercase letter, one number and one special character!!!",
        });
    }

    try {
        const user = await User.create({ fullname, username, email, password });

        res.status(200).json({ success: true, data: user });

    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(new errorResponse("Please provide email or password", 400));
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return next(new errorResponse("Invalid credentials", 401));
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return next(new errorResponse("Invalid credentials", 401));
        }

        res.status(200).json({ success: true, data: user });

    } catch (error) {
        next(error);
    }
};