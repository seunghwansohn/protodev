
const db = require("../models");
const config = require("../config/auth.config");
const multer = require('multer'); // multer모듈 적용 (for 파일업로드)

const Expense = db.expense;
const ExpenseSort = db.expenseSort;
const Files = db.files;


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
  

