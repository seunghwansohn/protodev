const controller = require("../controllers/client.controller");
const { verifySignUp } = require("../middleware");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/client/load", controller.load);
  app.post("/api/client/query", controller.query)
  app.post("/api/client/delete/", controller.delete);
  app.post("/api/client/update/", controller.update);
  app.post("/api/client/addNew", controller.addNew)
};


