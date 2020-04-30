const controller = require("../controllers/uploadFile.controller");
var fs = require('fs');


var multer = require('multer'); // multer모듈 적용 (for 파일업로드)

const upload = () => {
    let defaultLocation = 'uploads/'
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // console.log('레큐크크', req)
        let location = req.body.location
        let type     = req.body.type
        let newDir   = './' + defaultLocation + type
        let fullLocation = defaultLocation + type + '/' + location
        if (!fs.existsSync(newDir)){
            console.log(newDir)
            fs.mkdirSync(newDir);
        }
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
    app.post("/api/addfiles", upload().array('images', 10), (req, res) => {
    //   console.log(req)
      const file = req.files
      let location = req.body.location
      let type     = req.body.type
  
      if (file == [] || file == undefined) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
      }
        res.send('upload Succeccfully')
      
    })
}
    