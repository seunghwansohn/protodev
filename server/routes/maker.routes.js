const controller = require("../controllers/maker.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/maker/load/", controller.load);
  app.post("/api/maker/addNew", controller.addNew)
  app.post("/api/maker/delete/", controller.delete);

};


