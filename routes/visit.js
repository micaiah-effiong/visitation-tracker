var express = require("express");
const visit = require("../controllers/visit");
var router = express.Router();

router.use("/", visit);

/* GET visits listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

module.exports = router;
