const controller = require("../controllers/supplier.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/supplier/addNew", controller.addNew)
  app.post("/api/supplier/addNotes", controller.addNotes)
  app.get("/api/supplier/loadNotes/:id", controller.loadNotes);

};



