const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
let cookie = require('cookie-parser');


출처: https://zzdd1558.tistory.com/177 [YunJin_Choi]
module.exports = function(app) {
  app.use(cookie());
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/check", controller.check);
  
  app.post("/api/auth/logout", controller.logout);
};


