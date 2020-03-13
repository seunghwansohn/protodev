const controller = require("../controllers/project.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/project/load/", controller.load);
  app.post("/api/project/addNew", controller.addNew)
  app.post("/api/project/delete/", controller.delete);
  app.post("/api/project/update/", controller.update);
  app.post("/api/project/query/", controller.query);
  app.post("/api/project/notes/add", controller.addNotes);
  app.get("/api/project/notes/load/:id", controller.loadNotes);

  // app.post("/api/supplier/addNotes", controller.addNotes)
  // app.get("/api/supplier/loadNotes/:id", controller.loadNotes);
};



