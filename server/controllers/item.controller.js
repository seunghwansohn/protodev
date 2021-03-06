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
const getIncludeAttrArr = require("../lib/getIncludeAttrArr");
const getMatchedAttr = require("../lib/getMatchedAttr");
const setUpdate = require("../lib/setUpdate");




const getCreateObj = require("../lib/getCreateObj");
const setNameToCode = require("../lib/setNameToCode");

const {produce} = require ('immer')

const Item = db.item;
const Maker = db.maker;

const ItemPrice = db.itemPRice
const Role = db.role;
const Supplier = db.supplier;

const relAttr = {
  primaryKey : 'itemCode',
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
  console.log(vals)

  setUpdate(vals, ref, relAttr).then(result => {
    res.status(200).send(result)
  })
};

exports.load = (req, res) => {
  getIncludeName(relAttr).then(items => {
    res.status(200).send(items)
  })
};

exports.delete = async (req, res) => {
  let draft = await Item.findOne({where:{itemCode :req.body.code}})
  await draft.destroy().then(()=> {
      res.status(200).send('deleted Successfully')
  });
};


exports.query = (req, res) => {
  console.log(req.body)
  let {queryObj} = req.body
  // console.log(queryObj)
  let where = queryObj

  getIncludeNameFindOne(Item, primaryKey, where, findingAttr, includingAttr).then(items => {
    res.status(200).send(items)
  })
};