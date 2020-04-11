const controller = require("../controllers/quote.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.post("/api/quote", controller.quoteInput);

  // app.post("/api/quote/record", controller.quoteInput)
  app.get("/api/quote/load", controller.load)

};



