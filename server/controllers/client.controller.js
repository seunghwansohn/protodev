const db = require("../models");
const config = require("../config/auth.config");
const Role = db.role;
const Op = db.Sequelize.Op;

const Main = db.client;

const ClientRate = db.clientRate;
const monolize = require("../lib/monolizeSequel");
// const monolizeObj = require("../api/monolizeObj")

const primaryKey = 'clientCode'


exports.clientLoad = (req, res) => {
    let result = ''
    const includingKey = 'rate'
    Main.findAll(
      {include: [{model:ClientRate, as: includingKey, plain : true}]}
    ).then(clients => {
      clients = monolize(clients, includingKey)
      result = {primaryKey : primaryKey, result : clients}
      }).then(() =>{
        res.status(200).send(result);
      })
};
