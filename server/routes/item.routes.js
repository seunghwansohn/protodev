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
  app.get("/api/item/VNSelling", controller.VNSellingItemLoad);
  app.post("/api/item/new", controller.newItem)
  app.post("/api/item/newCopied", controller.newCopied)
  app.post("/api/item/test", controller.test)
  app.post("/api/item/checkExist", controller.check)
  app.post("/api/item/add", controller.newItem)
  app.post("/api/item/query", controller.query)
  app.post("/api/item/delete/", controller.delete);

};