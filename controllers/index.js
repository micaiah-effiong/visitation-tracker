const user = require("./user.js");
const visit = require("./visit.js");
module.exports = function (db) {
	return {
		user: user(db),
		visit: visit(db),
	};
};
