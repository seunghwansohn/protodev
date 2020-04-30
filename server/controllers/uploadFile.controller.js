
var multer = require('multer'); // multer모듈 적용 (for 파일업로드)


const upload = (type, location) => {
    let fullLocation = 'uploads/' + type + '/' + location
    let storage = multer.diskStorage({
      destination: function (req, file, cb) {
        console.log('레큐크크', req)
        cb(null, fullLocation)
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    })
    return multer({ storage: storage });
}

exports.uploadFile = (req, res) => {
    console.log(req)
    const file      = req.files
    let   location  = req.body.location
    let   type      = req.body.type
    // console.log('레큐파람은 ', req.params.id)
    // Note.findAll({where : {projectCode : req.params.id}}
    // ).then(notes => {
    //     console.log(notes)
    //     result = notes
    // }).then(() => {
    //     res.status(200).send(result);
    // })
    upload(type, location).array('images', 10)
};  
  

// var upload = (type, location) => {
//     let fullLocation = 'uploads/' + type + '/' + location
//     let storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, fullLocation)
//       },
//       filename: function (req, file, cb) {
//         cb(null, file.originalname)
//       }
//     })
//     return multer({ storage: storage });
// }
  
    

// module.exports = function(app) {
//     app.use(function(req, res, next) {
//       res.header(
//         "Access-Control-Allow-Headers",
//         "x-access-token, Origin, Content-Type, Accept"
//       );
//       next();
//     });
  
//     app.post("/api/addfiles", upload().array('images', 10), (req, res) => {
//       // console.log(req)
//       const file = req.files
//       let location = req.body.location
//       let type     = req.body.type
  
//       console.log(location)
//       // console.log(file)
//       if (file == [] || file == undefined) {
//         const error = new Error('Please upload a file')
//         error.httpStatusCode = 400
//         return next(error)
//       }
//         res.send('upload Succeccfully')
      
//     })
  
//   };
  