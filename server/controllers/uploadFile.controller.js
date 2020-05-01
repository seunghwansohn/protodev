
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
  const where = req.body

  const file        = req.files
  let   location    = req.body.location
  let   type        = req.body.type
  let   primaryKey  = req.body.primaryKey
  let   primaryCode = req.body.primaryCode

  let   files       = req.files

  let   Source    = db[type]

  let formData = new FormData();


    Files.findAll({
      where : where
    }).then(res => {
      res.map(async file => {
        const location = file.dataValues.addresses
        
        let No = location.lastIndexOf('/')
        let length = location.length  
        let originalFileName = location.slice(No + 1, length)

        console.log(originalFileName)
        // const fileName = file.dataValues
        // // console.log(fileName)
        // await fs.readFile(location, async (err, data) => {
        //   await fs.writeFile('../client/public/joru.txt', data, (err) => {
        //     if (err) throw err;
        //   })
        //   await formData.append(`image`, fileType)
        // })
        // await console.log(formData)
      })
    })

  // files.map(file => {
  //   Files.create({
  //     type : type,
  //     relCode : primaryCode,
  //     addresses : file.path
  //   })
  // })
};  

