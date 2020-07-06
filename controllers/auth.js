const asyncHandler = require("../handlers/async-handler");
const errorResponse = require("../handlers/error-response");

module.exports = (db) => {
  return {
    logout: asyncHandler((req, res, next) => {
      req.logout();
      res.redirect("/");
    }),
    login: asyncHandler((req, res, next) => {
      let { user } = req;
      req.login(user, function (err) {
        if (err) {
          return next(errorResponse("Incorrect email or password", 400));
        }
        res.json({
          success: true,
          location: "/dashboard",
          data: user.toJSON(),
        });
      });
    }),
  };
};
