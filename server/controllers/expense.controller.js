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
const getFilesAttr   = require("../lib/getFilesAttr");

const getIncludeAttrArr = require("../lib/getIncludeAttrArr");
const getMatchedAttr = require("../lib/getMatchedAttr");
const setUpdate = require("../lib/setUpdate");




const getCreateObj = require("../lib/getCreateObj");
const setNameToCode = require("../lib/setNameToCode");

const {produce} = require ('immer')

const Expense = db.expense;
const ExpenseSort = db.expenseSort;


const Role = db.role;
const Project = db.project;
const Files = db.files;

const relAttr = {
  source : Expense,
  rels : [
    {
      target: Project,
      relType : 'finding',
      asStr : 'project',
      attributes :['projectName'],
      primaryCode : 'projectCode'
    },
    {
      target: Files,
      relType : 'files',
      asStr : 'files',
      attributes :['addresses'],
      primaryCode : 'relCode'
    }
  ]
}

const Op = db.Sequelize.Op;
const primaryKey   = 'expenseCode'


const includingAttr = getIncludingAttr(relAttr)
const findingAttr   = getFindingAttr(relAttr)
const filesAttr     = getFilesAttr(relAttr)

console.log(filesAttr)


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
  getIncludeName(Expense, primaryKey, findingAttr, includingAttr, filesAttr).then(expenses => {
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