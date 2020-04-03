const db = require("../models");
const config = require("../config/auth.config");
const Quote = db.quote;
const Role = db.role;

const Op = db.Sequelize.Op;

var multer = require('multer'); // multer모듈 적용 (for 파일업로드)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) // cb 콜백함수를 통해 전송된 파일 이름 설정
  }
})
var upload = multer({ storage: storage })

exports.addFiles = (req, res) => {
  // console.log(req.body)
    // upload()
};

    
    