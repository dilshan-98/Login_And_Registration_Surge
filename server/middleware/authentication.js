const User = require("../models/user");
const jwt = require("jsonwebtoken");
const errorResponse = require("../utils/errorResponse");

const authentication = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(new errorResponse("Not Authorized to access this route!", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(new errorResponse("User unidentified", 404));
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }

}

module.exports = authentication;