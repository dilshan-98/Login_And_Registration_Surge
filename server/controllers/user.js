const User = require("../models/User");
const errorResponse = require("../utils/errorResponse");

exports.register = async (req, res, next) => {
    const { fullname, username, email, password } = req.body;
    try {
      const user = await User.create({ fullname, username, email, password });
  
      res.status(200).json({success: true,data: user});
  
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
  
      res.status(200).json({success: true,data: user});
  
    } catch (error) {
      next(error);
    }
  };