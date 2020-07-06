const db = require("../models/index.js");
const user = require("./user.js");
const visit = require("./visit.js");
const auth = require("./auth.js");
module.exports = (function (db) {
	return {
		user: user(db),
		visit: visit(db),
		auth: auth(db),
	};
})(db);
