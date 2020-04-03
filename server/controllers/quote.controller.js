const db = require("../models");
const config = require("../config/auth.config");
const Quote = db.quote;
const Role = db.role;

const Op = db.Sequelize.Op;

exports.quoteInput = (req, res) => {
  const quoteNo = req.body.info.date + '-' + req.body.info.quoteLastNo
  const items = req.body.contents
  // console.log(items)
  try {
    items.map(item => {
      Quote.create({
        quoteNo: quoteNo,
        itemNo : item.id,
        itemCode : item.itemCode,
        qty: item.qty,
        prieRate:item.priceRate
      })
    })
    res.send({ message: "User was registered successfully!" });
  }
  // .then(user => {
  //   res.send({ message: "User was registered successfully!" });
  // })
  catch (err) {
    res.status(500).send({message:err.message})
    console.log(err.message)
  }
};
