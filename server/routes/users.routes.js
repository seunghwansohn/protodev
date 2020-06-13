const { authJwt } = require("../middleware");
const authExpense = require("../middleware/authExpense");

const controller = require("../controllers/users.controller");
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
    "/api/user/load",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.test
  );
  
  app.post(
    "/api/user/query",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.query
  );

};