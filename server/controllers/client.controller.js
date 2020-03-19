const db = require("../models");
const config = require("../config/auth.config");
const Client = db.client;
const Role = db.role;
const Op = db.Sequelize.Op;
const ClientRate = db.clientRate;
const monolize = require("../lib/monolizeSequel");
// const monolizeObj = require("../api/monolizeObj")

exports.clientLoad = (req, res) => {
    let result = ''
    const includingKey = 'rate'
    Client.findAll({raw: true, include: [{model:ClientRate, as: includingKey, attributes:['increaseRate']}]}).then(clients => {
      console.log(clients)
      result = monolize(clients, includingKey)
      result = {primaryKey : primaryKey, result : result}
      res.status(200).send(users);
      });
    // ClientRate.findAll({include: [{model:ClientRate, as: 'clientRate'}]}).then(users => {
    //     console.log(users)
    //     res.status(200).send(users);
    //   });
};
