const controller = require("../controllers/task.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/task/load/", controller.load);
  app.post("/api/task/addNew", controller.addNew)
  app.post("/api/task/delete/", controller.delete);
  app.post("/api/task/update/", controller.update);
  app.post("/api/task/query/", controller.query);
  app.post("/api/task/notes/add", controller.addNotes);
  app.get("/api/task/notes/load/:id", controller.loadNotes);

  // app.post("/api/supplier/addNotes", controller.addNotes)
  // app.get("/api/supplier/loadNotes/:id", controller.loadNotes);
};



