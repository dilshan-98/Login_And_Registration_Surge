const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");

const {
  register,
  login,
  profileUpdate
} = require("../controllers/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profileUpdate").put(auth, profileUpdate);

module.exports = router;