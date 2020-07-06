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
        { model: db.worker, include: db.user },
        { model: db.visitor, include: db.user },
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
      let user = await db.user.findOne({ where: { email } });

      let person;
      let visit; /*= await user.getVisitor() || await user.getWorker();*/
      if (await user.getVisitor()) {
        person = await user.getVisitor();
        visit = await person.createVisit(req.body);
        let directedTo = await db.user.findOne({
          where: { email: req.body.directedTo },
        });

        let worker = await directedTo.getWorker();
        worker.addVisit(visit);
      } else {
        person = await user.getWorker();
        visit = await person.createVisit(req.body);
      }

      await visit.reload();
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
