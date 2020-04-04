const db = require("../models");
const config = require("../config/auth.config");
const monolize = require("../lib/monolizeSequel");
const calPrice = require("../lib/calPrice");
const rmTimeFromReq = require("../lib/sequelMiddleWares");
const getIncludeName = require("../lib/getIncludeName");
const getIncludingArr = require("../lib/getIncludingArr");
const getCreateObj = require("../lib/getCreateObj");
const setNameToCode = require("../lib/setNameToCode");


const {produce} = require ('immer')



const Item = db.item;
const ItemPrice = db.itemPRice
const Role = db.role;
const Supplier = db.supplier;

const relAttr = {
  source : Item,
  rels : [
    {
      target: Supplier,
      asStr : 'supplier',
      attributes : ''
    },
    {
      target: ItemPrice,
      asStr : 'price',
      attribues :''
    }
  ]
}

const Op = db.Sequelize.Op;

const primaryKey   = 'itemCode'

exports.addNew = (req, res) => {
  const {addedNew, primaryKey, includingKeys, findingKeys} = req.body

  console.log(req.body)
  let result = ''

  const includings  = {}
  let addedObj      = rmTimeFromReq(addedNew)
  const primaryCode = addedNew[primaryKey]
  
  const includingArr  = (getIncludingArr(relAttr, includingKeys))
  const createObj     = getCreateObj(addedNew, primaryKey, primaryCode, includingKeys, findingKeys)

  const getModelFromAsStr = (relAttr, asStr) => {
    let temp = ''
    relAttr.rels.map(rel => {
      if (rel.asStr == asStr) {
        temp = rel.target
      }
    })
    return temp
  }
  // const findingAsStr = Object.keys(findingKeys[0])[0]
  
  // getModelFromAsStr(relAttr, findingAsStr).findOne({where:{supplierName:'ㄷㄹㄹㄹ'}}).then(result => console.log(result))

  setNameToCode(relAttr, findingKeys, addedObj)
  // .then(result => console.log(result))


  createObj.then(obj => {
    result = obj
  }).then(() => {
    // res.status(200).send(includingArr)
    res.status(200).send(result)
    Item.create(result, {include:includingArr}).then(() => {
      res.status(200).send('Item Suceessfully Added')
    }).catch((err) => {
    res.status(500).send({message:err.message})
  })
  .catch((err) => {
    res.status(500).send({message:err.message})
  })
})
};





exports.test = (req,res) => {
  let primaryKey = 'itemCode'
  let includingAttr = [
    {model:Supplier, plain : true, raw: false, nest : false, as : 'supplier', attributes : ['supplierName']},
    {model:ItemPrice, plain : true, raw: false, nest : false, as: 'price', attributes : ['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']}
  ]
  getIncludeName(Item, Supplier, primaryKey, includingAttr).then(items => {
    res.status(500).send(items)
  })
}

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
    let primaryKey = 'itemCode'
    let findingAttr = [
      {model:Supplier, plain : true, raw: false, nest : false, as : 'supplier', attributes : ['supplierName'], primaryCode : 'supplierCode'},
    ]
    let includingAttr = [
      {model:ItemPrice, plain : true, raw: false, nest : false, as: 'price', attributes : ['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']}
    ]
    getIncludeName(Item, Supplier, primaryKey, findingAttr, includingAttr).then(items => {
      res.status(200).send(items)
    })
};

exports.delete = async (req, res) => {
  // console.log(req.body)
  let draft = await Item.findOne({where:{itemCode :req.body.code}})
  await draft.destroy().then(()=> {
      res.status(200).send('deleted Successfully')
  });
};

exports.VNSellingItemLoad = (req, res) => {
  let items = ''
  Item.findAll().then(users => {
      items = users
      res.status(200).send(items);
    });
};

exports.newItem = (req, res) => {
  // console.log('뉴아이템 콘솔레큐', req.body)
  Item.create({
    itemCode : req.body.item.itemCode,
    itemName : req.body.item.itemName,
    // maker : req.body.item.maker,
    // makerModelNo : req.body.item.makerModelNo,
    // description : req.body.item.description,
    // width : req.body.item.width,
    // depth : req.body.item.depth,
    // height : req.body.item.depth,
    // weight : req.body.item.weight,
    // supplier : req.body.item.supplier,
    // importTaxRate : req.body.item.importTaxRate,
    VNPrice : {
      VNPrice: req.body.item.VNPrice,
      itemCode : req.body.item.itemCode,
      importRate: req.body
    }
  },
  {include:[{model:ItemPrice, plain : true, as:'VNPrice'}]})
    .then(result => {
      // console.log('리절트', result)
      res.status(200).send('성공')
    })
    .catch(err=>{
      // console.log('에러는', err)
      res.status(200).send({error: err.errors})

    })
}

exports.newCopied = async (req, res) => {
  res.body = await Item.findOne({where: req.body})
  await res.status(200).send(res.body)
};

// exports.test = (req, res) => {
//   res.body = Item.findAll({where: req.body, include: [{model:ItemVNPrice, as: 'VNPrice'}] }).then(result =>{
//     res.status(200).send(result)
//   })
//   //include는 belongsTo등으로 연결된 모든 테이블의 값을 불러오는 옵션
//   // res.status(200).send(res.body)
// };

exports.check = (req, res) => {
  // console.log(req.body)
  const {table, checkVal} = req.body
  // console.log(table)
  // console.log(checkVal)
};

exports.query = (req, res) => {
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
        // console.log(result)
        res.status(200).send(result);
      }) 
  }
  catch (err) {
    res.status(500).send({message:err.message})
    // console.log(err.message)
  }
};