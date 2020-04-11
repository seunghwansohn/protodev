const db = require("../models");
const config = require("../config/auth.config");

const monolize = require("../lib/monolizeSequel");
const calPrice = require("../lib/calPrice");
const rmTimeFromReq = require("../lib/sequelMiddleWares");
const getIncludeName = require("../lib/getIncludeName");
const getIncludingArr = require("../lib/getIncludingArr");
const getIncludingAttr = require("../lib/getIncludingAttr");
const getFindingAttr = require("../lib/getFindingAttr");


const getCreateObj = require("../lib/getCreateObj");
const setNameToCode = require("../lib/setNameToCode");

const {produce} = require ('immer')

const Quote = db.quote;
const Role = db.role;

const relAttr = {
  source : Quote,
  rels : [
  //   {
  //     target: Supplier,
  //     relType : 'finding',
  //     asStr : 'supplier',
  //     attributes : ['supplierName'],
  //     primaryCode : 'supplierCode'
  //   },
  //   {
  //     target: ItemPrice,
  //     relType : 'including',
  //     asStr : 'price',
  //     attributes :['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']
  //   }
  ]
}

const Op = db.Sequelize.Op;
const primaryKey   = 'quoteNo'


// exports.quoteInput = (req, res) => {
//   const quoteNo = req.body.info.date + '-' + req.body.info.quoteLastNo
//   const items = req.body.contents
//   // console.log(items)
//   try {
//     items.map(item => {
//       Quote.create({
//         quoteNo: quoteNo,
//         itemNo : item.id,
//         itemCode : item.itemCode,
//         qty: item.qty,
//         prieRate:item.priceRate
//       })
//     })
//     res.send({ message: "User was registered successfully!" });
//   }
//   // .then(user => {
//   //   res.send({ message: "User was registered successfully!" });
//   // })
//   catch (err) {
//     res.status(500).send({message:err.message})
//     console.log(err.message)
//   }
// };

exports.load = (req, res) => {

  const includingAttr = getIncludingAttr(relAttr)
  const findingAttr   = getFindingAttr(relAttr)

  getIncludeName(Quote, Quote, primaryKey, findingAttr, includingAttr).then(items => {
    res.status(200).send(items)
  })
};
