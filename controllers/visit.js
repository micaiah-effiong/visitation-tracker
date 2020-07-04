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
			req.query.page = req.query.page || 0;
			let fullQuery = qureyHandler(req.query);

			let visits = await db.visit.findAll(fullQuery);
			let data = visits.map((visit) => visit.toPublicJSON());

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
			let visit = await visitor.createVisitor(req.body);
			if (visitor.type == "visitor" && req.body.directedTo) {
				await directTo.addVisit(visit);
			}
			res.json({
				success: true,
				data: visit.toJSON(),
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
