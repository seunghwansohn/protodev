const db = require("../models");
const config = require("../config/auth.config");
const Client = db.client;
const Role = db.role;
const Op = db.Sequelize.Op;
const ClientRate = db.clientRate;
// const monolizeObj = require("../api/monolizeObj")

exports.clientLoad = (req, res) => {
    Client.findAll({raw: true, include: [{model:ClientRate, as: 'rate', attributes:['increaseRate']}]}).then(users => {
      res.status(200).send(users);
      });
    // ClientRate.findAll({include: [{model:ClientRate, as: 'clientRate'}]}).then(users => {
    //     console.log(users)
    //     res.status(200).send(users);
    //   });
};
