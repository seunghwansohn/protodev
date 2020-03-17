const db = require("../models");
const config = require("../config/auth.config");
const monolize = require("../lib/monolizeSequel");
const calPrice = require("../lib/calPrice");

const Item = db.item;
const ItemPrice = db.itemPRice
const Role = db.role;

const Op = db.Sequelize.Op;

exports.itemLoad = (req, res) => {
    let result = ''
    const includingKey = 'Price'
    Item.findAll(
      {include: [{model:ItemPrice, as: includingKey}] }
      ).then(items => {
        result = monolize(items, includingKey)
      }).then(() => {
        calPrice.VNSellP(result)

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
  {include:[{model:ItemVNPrice, as:'VNPrice'}]})
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