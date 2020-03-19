const db = require("../models");
const config = require("../config/auth.config");
const monolize = require("../lib/monolizeSequel");
const calPrice = require("../lib/calPrice");
const rmTimeFromReq = require("../lib/sequelMiddleWares");

const Item = db.item;
const ItemPrice = db.itemPRice
const Role = db.role;

const Op = db.Sequelize.Op;

const primaryKey   = 'itemCode'

exports.addNew = (req, res) => {
  const {addedNew, includingKeys} = req.body
  try {
    addedNew.map(obj => {
      const includings = {}
      newObj = rmTimeFromReq(obj)
      const primaryCode = obj[primaryKey]
      
      const deleteIncludings = (obj, includingKeys) => {
        includingKeys.map(key => {
          if (key !== primaryKey) {
            includings[key] = obj[key]
            delete obj[key]
          }
        })
        return obj
      }

      newObj = deleteIncludings(obj, includingKeys)
      // console.log(newObj)
      
      const fixIncludings = (includings) => {
        delete includings.id
        includings[primaryKey] = primaryCode
        return includings
      }
      
      // newObj.VNPrice = {
      //   VNPrice: req.body.item.VNPrice,
      //   itemCode : req.body.item.itemCode,
      //   importRate: req.body
      // }
      // item.findOne({where: obj}).then(res => {
      //   console.log(res)
      // })
      const asString = 'Price'

      newObj[asString] = fixIncludings(includings)

      console.log(newObj)
      
      Item.create(newObj, {include:[{model:ItemPrice, as:asString}]}).then(() => {
          res.send({ message: "item added successfully" });
      })
    })
  }
  catch (err) {
    res.status(500).send({message:err.message})
    console.log(err.message)
  }
};


// VNPrice : {
//   VNPrice: req.body.item.VNPrice,
//   itemCode : req.body.item.itemCode,
//   importRate: req.body
// }
// },
// {include:[{model:ItemVNPrice, as:'VNPrice'}]})
// .then(result => {
//   console.log('리절트', result)
//   res.status(200).send('성공')
// })


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
    let result = ''
    const includingKey = 'Price'
    Item.findAll(
      {include: [{model:ItemPrice, plain : true, as: includingKey}]}
      ).then(items => {
        // console.log(items)
        result = monolize(items, includingKey)
        // console.log(result)
        result = {primaryKey : primaryKey, result : result}
      }).then(() => {
        // calPrice.VNSellP(result)
        // console.log(result)
        res.status(200).send(result);
      })
};

exports.delete = async (req, res) => {
  console.log(req.body)
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
  console.log('뉴아이템 콘솔레큐', req.body)
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
      console.log('리절트', result)
      res.status(200).send('성공')
    })
    .catch(err=>{
      console.log('에러는', err)
      res.status(200).send({error: err.errors})

    })
}

exports.newCopied = async (req, res) => {
  res.body = await Item.findOne({where: req.body})
  await res.status(200).send(res.body)
};

exports.test = (req, res) => {
  res.body = Item.findAll({where: req.body, include: [{model:ItemVNPrice, as: 'VNPrice'}] }).then(result =>{
    res.status(200).send(result)
  })
  //include는 belongsTo등으로 연결된 모든 테이블의 값을 불러오는 옵션
  // res.status(200).send(res.body)
};

exports.check = (req, res) => {
  console.log(req.body)
  const {table, checkVal} = req.body
  console.log(table)
  console.log(checkVal)
};

exports.query = (req, res) => {
  try {
    console.log(req.body)
    let result = ''
    const includingKey = 'Price'
    Item.findAll(
      {where: req.body, include: [{model:ItemPrice, as: includingKey}] }
      ).then(items => {
        result = monolize(items, includingKey)
      }).then(() => {
        calPrice.VNSellP(result)
        console.log(result)
        res.status(200).send(result);
      })
  }
  catch (err) {
    res.status(500).send({message:err.message})
    console.log(err.message)
  }
};