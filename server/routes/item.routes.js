const controller = require("../controllers/item.controller");
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

  app.get("/api/item/load", controller.itemLoad);
  app.post("/api/item/query", controller.query)
  app.post("/api/item/delete/", controller.delete);
  app.post("/api/item/update/", controller.update);
  app.post("/api/item/addNew", controller.addNew)
};