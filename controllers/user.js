const asyncHandler = require("../handlers/async-handler.js");
module.exports = function (db) {
	return {
		getOne: asyncHandler(async (req, res, next) => {
			let id = Number(req.params.id);
			let user = await db.user.findByPk(id);
			res.json({
				success: true,
				data: user.toPublicJSON(),
			});
		}),

		getAll: asyncHandler(async (req, res, next) => {
			let users = await db.user.findAll();
			let data = users.map((user) => user.toPublicJSON());
			res.json({
				success: true,
				data,
			});
		}),

		create: asyncHandler(async function (req, res, next) {
			let user = await db.user.create(req.body);
			res.json({
				success: true,
				data: user.toPublicJSON(),
			});
		}),

		update: asyncHandler(async (req, res, next) => {
			let id = Number(req.params.id);
			let user = await db.user.update(req.body, {
				where: {
					id,
				},
			});
			res.json({
				success: true,
				data: user.toJSON(),
			});
		}),

		delete: asyncHandler(async (req, res, next) => {
			let id = Number(req.params.id);
			let user = await db.user.destroy(id);
			res.json({
				success: true,
				data: user.toJSON(),
			});
		}),
	};
};
