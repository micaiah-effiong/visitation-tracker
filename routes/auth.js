var express = require("express");
let { login, logout, register } = require("../controllers/index").auth;
let passport = require("../config/passport-config");
const { create } = require("../controllers/index").user;
var router = express.Router();

router.route("/logout").get(logout);
router.route("/login").post(passport.authenticate("local"), login);
router.route("/register").post(create);

module.exports = router;
