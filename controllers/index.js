const db = require("../models/index.js");
const user = require("./user.js");
const visit = require("./visit.js");
module.exports = function () {
	return {
		user: user(db),
		visit: visit(db),
	};
};
