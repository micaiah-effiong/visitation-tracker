var express = require("express");
const isAuth = require("../middlewares/isAuth");
const { getOne, getAll, update, remove } = require("../controllers/index").user;
var router = express.Router();

/* GET users listing. */
/*router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});*/

router.route("/").get(getAll);
router.route("/:id").get(getOne).put(update).delete(remove);

module.exports = router;
