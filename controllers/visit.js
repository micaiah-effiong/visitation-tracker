const asyncHandler = require("../handlers/async-handler.js");
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
			let visits = await db.visit.findAll();
			let data = visits.map((visit) => visit.toPublicJSON());
			res.json({
				success: true,
				data,
			});
		}),

		create: asyncHandler(async function (req, res, next) {
			let visit = await db.visit.create(req.body);
			res.json({
				success: true,
				data: visit.toPublicJSON(),
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

		delete: asyncHandler(async (req, res, next) => {
			let id = Number(req.params.id);
			let visit = await db.visit.destroy(id);
			res.json({
				success: true,
				data: visit.toJSON(),
			});
		}),
	};
};
