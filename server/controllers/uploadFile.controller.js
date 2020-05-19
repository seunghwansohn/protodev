
const db = require("../models");
const config = require("../config/auth.config");
const multer = require('multer'); // multer모듈 적용 (for 파일업로드)

const Expense = db.expense;
const ExpenseSort = db.expenseSort;
const Files = db.files;
const FormData = require('form-data');



var fs = require('fs');



// const relAttr = {
//   source : Item,
//   rels : [
//     {
//       target: Supplier,
//       relType : 'finding',
//       asStr : 'supplier',
//       attributes : ['supplierName'],
//       primaryCode : 'supplierCode'
//     },
//     {
//       target: Maker,
//       relType : 'finding',
//       asStr : 'maker',
//       attributes : ['makerName'],
//       primaryCode : 'makerCode'
//     },
//     {
//       target: ItemPrice,
//       relType : 'including',
//       asStr : 'price',
//       attributes :['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']
//     }
//   ]
// }


exports.uploadFile = (req, res) => {
    const file        = req.files
    let   location    = req.body.location
    let   type        = req.body.type
    let   primaryKey  = req.body.primaryKey
    let   primaryCode = req.body.primaryCode

    let   files       = req.files

    let   Source    = db[type]
    
    let where = {}
    where[primaryKey] = primaryCode

    console.log(req.files)

    files.map(file => {
      Files.create({
        type : type,
        relCode : primaryCode,
        addresses : file.path
      })
    })
};  
  

exports.loadFiles = (req, res) => {
  let where = {relcode : req.body.relCode}
  let reqNo = req.body.reqNo
  console.log('레큐넘버어어', reqNo)
  const file        = req.files
  let   location    = req.body.location
  let   type        = req.body.type
  let   primaryKey  = req.body.primaryKey
  let   primaryCode = req.body.primaryCode

  let   fileList    = []
  let   files       = req.files

  let   Source    = db[type]

  let formData = new FormData();

  fs.mkdir('../client/public/temp/' + reqNo, { recursive: true }, (err) => {
    if (err) throw err;

    Files.findAll({
      where : where
    }).then(result => {
      result.map(async file => {
        console.log(file.dataValues)
        const location = file.dataValues.addresses
        let lastSlash = location.lastIndexOf('/')
        let length = location.length  
        let originalFileName = location.slice(lastSlash + 1, length)

        console.log(originalFileName)
        const tempFileAddr = '/temp/' + reqNo + '/' + originalFileName
        fileList.push(tempFileAddr)

        await fs.readFile(location, async (err, data) => {
          await fs.writeFile('../client/public' + tempFileAddr, data, (err) => {
            if (err) throw err;
          })
        })
      })
    res.send(fileList)
    })
  });
};  

exports.cleanFolder = (req, res) => {
  console.log(req.body)
  const {hashNo} = req.body
  const tempFolder = '../client/public/temp/'
  fs.rmdirSync(tempFolder + hashNo, {recursive : true})
}

  // files.map(file => {
  //   Files.create({
  //     type : type,
  //     relCode : primaryCode,
  //     addresses : file.path
  //   })
  // })
  


