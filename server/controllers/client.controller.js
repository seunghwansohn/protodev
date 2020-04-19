const db = require("../models");
const config = require("../config/auth.config");
const Role = db.role;

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
const setUpdate = require("../lib/setUpdate");


const {produce} = require ('immer')


const Client = db.client;
const ClientRate = db.clientRate;


const relAttr = {
  source : Client,
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

const includingAttr = getIncludingAttr(relAttr)
const findingAttr   = getFindingAttr(relAttr)

const Op = db.Sequelize.Op;
const primaryKey = 'clientCode'


exports.addNew = (req, res) => {
  console.log(req.body)
  const {addedNew, primaryKey, includingKeys, findingKeys} = req.body
  const primaryCode   = addedNew[primaryKey]
  
  let addedNewRmTime  = rmTimeFromReq(addedNew)

  const includings  = {}
  const includingArr  = (getIncludingArr(relAttr, includingKeys))

  const createObj     = getCreateObj(addedNewRmTime, primaryKey, primaryCode, includingKeys, findingKeys)

  createObj.then(result => {
    Client.create(result, {include:includingArr}).then(() => {
      res.status(200).send('Item Suceessfully Added')
    }).catch((err) => {
      res.status(500).send({message:err.message})
    })
  })
};


exports.update = async (req, res) => {
  console.log(req.body)
  let data = req.body
  let { ref,vals } = data
  console.log(vals)

  setUpdate(vals, ref, relAttr).then(result => {
    res.status(200).send(result)
  })
};

exports.load = (req, res) => {

  const includingAttr = getIncludingAttr(relAttr)
  const findingAttr   = getFindingAttr(relAttr)

  getIncludeName(Client, primaryKey, findingAttr, includingAttr).then(items => {
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
  let {queryObj} = req.body
  console.log(queryObj)
  let where = queryObj

  getIncludeNameFindOne(Client, primaryKey, where, findingAttr, includingAttr).then(items => {
    res.status(200).send(items)
  })
};