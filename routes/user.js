var express = require("express");
const user = require("../controllers/user");
var router = express.Router();

router.use("/", user);
/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
