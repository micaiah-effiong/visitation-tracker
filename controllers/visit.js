const asyncHandler = require("../handlers/async-handler.js");
const { qureyHandler, pagination } = require("../handlers/index");

module.exports = function (db) {
	return {
		getOne: asyncHandler(async (req, res, next) => {
			let id = Number(req.params.id);
			let visit = await db.visit.findByPk(id);
			res.json({
				success: true,
				data: visit.toPublicJSON(),
			});
		}),

		getAll: asyncHandler(async (req, res, next) => {
			req.query.limit = req.query.limit || 10;
			req.query.page = req.query.page || 1;
			let fullQuery = qureyHandler(req.query);
			fullQuery.include = [
				{ model: db.user, as: "users" },
				{ model: db.user, as: "visitors" },
			];

			let visits = await db.visit.findAll(fullQuery);
			let data = visits.map((visit) => visit.toJSON());

			res.json({
				success: true,
				data,
				pagination: await pagination(req.query, "visit"),
			});
		}),

		create: asyncHandler(async function (req, res, next) {
			let { email } = req.body;
			let visitor = await db.user.findOne({ where: { email } });
			let directTo = await db.user.findOne({
				where: { email: req.body.directedTo },
			});
			req.body.directedTo = directTo.name;
			if (!(visitor.type == db.user.getUserClass("VIS"))) {
				req.body.directedTo = "";
			}

			let visit = await visitor.createVisit(req.body);
			if (visitor.type == db.user.getUserClass("VIS") && req.body.directedTo) {
				await directTo.addVisit(visit);
			}

			let newVisit = await visit.reload();

			res.json({
				success: true,
				data: newVisit.toJSON(),
			});
		}),

		update: asyncHandler(async (req, res, next) => {
			let id = Number(req.params.id);
			let visit = await db.visit.update(req.body, {
				where: {
					id,
				},
			});
			res.json({
				success: true,
				data: visit.toJSON(),
			});
		}),

		remove: asyncHandler(async (req, res, next) => {
			let id = Number(req.params.id);
			let visit = await db.visit.destroy(id);
			res.json({
				success: true,
				data: visit.toJSON(),
			});
		}),
	};
};
