const db = require("../models");
const config = require("../config/auth.config");
const ItemVNPrice = db.itemVNPRice
const Role = db.role;

const Op = db.Sequelize.Op;

exports.itemLoad = (req, res) => {
    let items = ''
    ItemVNPrice.findAll().then(users => {
        items = users
        res.status(200).send(items);
      });
};

