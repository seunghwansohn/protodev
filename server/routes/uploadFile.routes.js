const controller = require("../controllers/uploadFile.controller");
var fs = require('fs');


var multer = require('multer'); // multer모듈 적용 (for 파일업로드)

const upload = () => {
  let defaultLocation = 'uploads/'
  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let location = req.body.location
      let type     = req.body.type
      let newDir   = './' + defaultLocation + type
      let fullLocation = defaultLocation + type + '/' + location

      const makingDir = async function(resolve, reject){
        if (!fs.existsSync(newDir)){
          await fs.mkdirSync(newDir);
        }
        if (!fs.existsSync(fullLocation)){
          await fs.mkdirSync(fullLocation);
        }
      }

      makingDir().then(res => {
        console.log(res)
      })

      console.log(fullLocation)
      cb(null, fullLocation)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  return multer({ storage: storage });
}

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  // app.post("/api/addfiles", controller.uploadFile)
  app.post("/api/addfiles", upload().array('images', 10), controller.uploadFile)
  app.post("/api/query/files", controller.loadFiles)

}
    

