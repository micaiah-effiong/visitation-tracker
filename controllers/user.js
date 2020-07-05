const asyncHandler = require("../handlers/async-handler.js");
const { qureyHandler, pagination } = require("../handlers/index");

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
      req.query.limit = req.query.limit || 10;
      req.query.page = req.query.page || 1;
      let fullQuery = qureyHandler(req.query);

      let users = await db.user.findAll(fullQuery);
      let data = users.map((user) => user.toPublicJSON());

      res.json({
        success: true,
        data,
        pagination: await pagination(req.query, "user"),
      });
    }),

    create: asyncHandler(async function (req, res, next) {
      let name = req.body.name || `${req.body.firstname} ${req.body.lastname}`;
      req.body.name = name;

      let user = await db.user.create(req.body);
      if ("VIS" === req.body.type.toUpperCase()) {
        await user.createVisitor(req.body);
      } else {
        await user.createWorker(req.body);
      }

      if ("Admin" === db.worker.getUserClass(req.body.type)) {
        let detail = { password: req.body.password };
        await user.createUserAdminAccessInfo(detail);
      }

      user = await user.reload();
      res.json({
        success: true,
        location: "/login",
        data: user.toJSON(),
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

    remove: asyncHandler(async (req, res, next) => {
      let id = Number(req.params.id);
      let user = await db.user.destroy(id);
      res.json({
        success: true,
        data: user.toJSON(),
      });
    }),
  };
};
