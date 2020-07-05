var express = require("express");
const {
	getOne,
	getAll,
	create,
	update,
	remove,
} = require("../controllers/index").visit;
var router = express.Router();

/* GET visits listing. */
// router.get("/", function (req, res, next) {
// 	res.send("respond with a resource");
// });

router.route("/").post(create).get(getAll);
router.route("/:id").get(getOne).put(update).delete(remove);

module.exports = router;
