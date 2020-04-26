const controller = require("../controllers/expense.controller");
const { authJwt } = require("../middleware");
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

  app.get("/api/expense/load", controller.load);
  app.post("/api/expense/query", controller.query)
  app.post("/api/expense/delete/", controller.delete);
  app.post("/api/expense/update/", controller.update);
  app.post("/api/expense/addNew", controller.addNew)
};