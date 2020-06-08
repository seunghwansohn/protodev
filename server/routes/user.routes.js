const { authJwt } = require("../middleware");
const authExpense = require("../middleware/authExpense");

const controller = require("../controllers/user.controller");
let cookie = require('cookie-parser');


module.exports = function(app) {
  app.use(cookie())
  app.use(function(req, res, next) {
    console.log('쿠키는', res.cookie)
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.post(
    "/api/test/mod",
    [authJwt.verifyToken, authExpense.isModerator], 
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.post(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );
};