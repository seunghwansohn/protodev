const { authJwt } = require("../middleware");
const authExpense = require("../middleware/authExpense");

const controller = require("../controllers/user.controller");
const groupController = require("../controllers/group.controller");

let cookie = require('cookie-parser');


module.exports = function(app) {
  app.use(cookie())
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/role/load",
    [authJwt.verifyToken, authJwt.isAdmin],
    groupController.test
  );
};