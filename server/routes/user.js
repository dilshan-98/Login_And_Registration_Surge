const express = require("express");
const router = express.Router();

const {
  register,
  login,
  profileUpdate
} = require("../controllers/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profileUpdate").put(profileUpdate);

module.exports = router;