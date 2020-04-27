const controller = require("../controllers/expenseSort.controller");
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

  app.get("/api/expenseSort/load", controller.load);
  app.post("/api/expenseSort/query", controller.query)
  app.post("/api/expenseSort/delete/", controller.delete);
  app.post("/api/expenseSort/update/", controller.update);
  app.post("/api/expenseSort/addNew", controller.addNew)
};