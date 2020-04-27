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

const ExpenseSort = db.expenseSort;

const Role = db.role;
const Project = db.project;

const relAttr = {
  source : ExpenseSort,
  rels : [
    // {
    //   target: Project,
    //   relType : 'including',
    //   asStr : 'price',
    //   attributes :['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']
    // }
  ]
}

const Op = db.Sequelize.Op;
const primaryKey   = 'id'


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
    Expense.create(result, {include:includingArr}).then(() => {
      res.status(200).send('Expense Suceessfully Added')
    }).catch((err) => {
      res.status(500).send({message:err.message})
    })
  })
};


exports.update = async (req, res) => {
  let data = req.body
  let { ref,vals } = data
  console.log(data)
  console.log(ref)
  console.log(vals)

  setUpdate(vals, ref, relAttr).then(result => {
    res.status(200).send(result)
  })
};

exports.load = (req, res) => {
  const includingAttr = getIncludingAttr(relAttr)
  const findingAttr   = getFindingAttr(relAttr)
  getIncludeName(relAttr.source, primaryKey, findingAttr, includingAttr).then(expenses => {
    res.status(200).send(expenses)
  })
};

exports.delete = async (req, res) => {
  let draft = await Expense.findOne({where:{expenseCode :req.body.code}})
  await draft.destroy().then(()=> {
      res.status(200).send('deleted Successfully')
  });
};


exports.query = (req, res) => {
  let {queryObj} = req.body
  console.log(queryObj)
  let where = queryObj

  getIncludeNameFindOne(Expense, primaryKey, where, findingAttr, includingAttr).then(expenses => {
    res.status(200).send(expenses)
  })
};