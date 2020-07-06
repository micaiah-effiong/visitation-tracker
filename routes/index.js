var express = require("express");
var router = express.Router();
const isAuth = require("../middlewares/isAuth");
const user = require("./user.js");
const visit = require("./visit.js");
const auth = require("./auth.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "The RootHub" });
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

/*authenticated routes*/
router.use("/auth", auth);
router.use(isAuth);
router.use("/users", user);
router.use("/visits", visit);

router.get("/dashboard", function (req, res, next) {
  res.render("dashboard");
});

module.exports = router;
