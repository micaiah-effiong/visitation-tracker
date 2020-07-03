var express = require("express");
var router = express.Router();
const user = require("./user.js");
const visit = require("./visit.js");

router.use("/users", user);
router.use("/visit", visit);

/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

module.exports = router;
