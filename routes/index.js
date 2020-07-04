var express = require("express");
var router = express.Router();
const isAuth = require("../middlewares/isAuth");
const user = require("./user.js");
const visit = require("./visit.js");
const auth = require("./auth.js");

router.use("/users", user);
router.use("/auth", auth);
router.use(isAuth);
router.use("/visits", visit);

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;
