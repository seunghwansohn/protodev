const db = require("../models");
const config = require("../config/auth.config");
const monolize = require("../lib/monolizeSequel");
const calPrice = require("../lib/calPrice");
const rmTimeFromReq = require("../lib/sequelMiddleWares");
const getIncludeName = require("../lib/getIncludeName");
const getIncludeNameFindOne = require("../lib/getIncludeNameFindOne");

const getIncludingArr = require("../lib/getIncludingArr");
const getIncludingAttr = require("../lib/getIncludingAttr");
const getFindingAttr = require("../lib/getFindingAttr");


const getCreateObj = require("../lib/getCreateObj");
const setNameToCode = require("../lib/setNameToCode");

const {produce} = require ('immer')

const Item = db.item;
const Maker = db.maker;

const ItemPrice = db.itemPRice
const Role = db.role;
const Supplier = db.supplier;

const relAttr = {
  source : Item,
  rels : [
    {
      target: Supplier,
      relType : 'finding',
      asStr : 'supplier',
      attributes : ['supplierName'],
      primaryCode : 'supplierCode'
    },
    {
      target: Maker,
      relType : 'finding',
      asStr : 'maker',
      attributes : ['makerName'],
      primaryCode : 'makerCode'
    },
    {
      target: ItemPrice,
      relType : 'including',
      asStr : 'price',
      attributes :['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']
    }
  ]
}

const Op = db.Sequelize.Op;
const primaryKey   = 'itemCode'


const includingAttr = getIncludingAttr(relAttr)
const findingAttr   = getFindingAttr(relAttr)

exports.addNew = (req, res) => {
  const {addedNew, primaryKey, includingKeys, findingKeys} = req.body
  const primaryCode   = addedNew[primaryKey]
  
  let addedNewRmTime  = rmTimeFromReq(addedNew)

  const includings  = {}
  const includingArr  = (getIncludingArr(relAttr, includingKeys))

  const createObj     = getCreateObj(addedNewRmTime, primaryKey, primaryCode, includingKeys, findingKeys)

  createObj.then(result => {
    Item.create(result, {include:includingArr}).then(() => {
      res.status(200).send('Item Suceessfully Added')
    }).catch((err) => {
      res.status(500).send({message:err.message})
    })
  })
};


exports.update = async (req, res) => {
  let data = req.body

  let { ref,vals } = data
  
  try {
      const draft = await Item.findOne({where:ref})
      keys = await Object.keys(vals)

      keys.map(async key => {
          draft[key] = vals[key]
      })
      await draft.save().then(() => {
          res.status(200).send('updated Successfully')
      })
  }
  catch (err) {

  }
};

exports.itemLoad = (req, res) => {
  // console.log(req.body)

  const includingAttr = getIncludingAttr(relAttr)
  const findingAttr   = getFindingAttr(relAttr)
  // res.send(findingAttr)
  getIncludeName(Item, primaryKey, findingAttr, includingAttr).then(items => {
    res.status(200).send(items)
  })
};

exports.delete = async (req, res) => {
  let draft = await Item.findOne({where:{itemCode :req.body.code}})
  await draft.destroy().then(()=> {
      res.status(200).send('deleted Successfully')
  });
};


exports.query1 = (req, res) => {
  console.log(req.body)
  try {
    const where = req.body
    let result = ''
    const includingKey = 'price'
    Item.findAll(
      {where: where, include: [{model:ItemPrice, as: includingKey}] }
      ).then(items => {
        result = monolize(items, includingKey)
      }).then(() => {
        calPrice.VNSellP(result)
        res.status(200).send(result);
      }) 
  }
  catch (err) {
    res.status(500).send({message:err.message})
  }
};


exports.query = (req, res) => {
  let {queryObj} = req.body
  console.log(queryObj)
  let where = queryObj

  getIncludeNameFindOne(Item, primaryKey, where, findingAttr, includingAttr).then(items => {
    res.status(200).send(items)
  })
};


// exports.test = (req,res) => {
//   let primaryKey = 'itemCode'
//   let includingAttr = [
//     {model:Supplier, plain : true, raw: false, nest : false, as : 'supplier', attributes : ['supplierName']},
//     {model:ItemPrice, plain : true, raw: false, nest : false, as: 'price', attributes : ['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']}
//   ]
//   getIncludeName(Item, Supplier, primaryKey, includingAttr).then(items => {
//     res.status(500).send(items)
//   })
// }