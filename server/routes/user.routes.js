const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const cookieParser = require('cookie-parser')


module.exports = function(app) {
  app.use(cookieParser())
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator], 
    //isModerator는 성공시 next()를, 실패시 에러메시지를 반환하여
    //성공시에만 controller로 들어가도록 해줌.
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};