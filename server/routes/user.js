const express = require("express");
const router = express.Router();
const auth = require("../middleware/authentication");

const {
  register,
  login,
  profileUpdate,
  userDetails
} = require("../controllers/user");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profileUpdate").put(auth, profileUpdate);
router.route("/userDetails").get(auth, userDetails);

module.exports = router;