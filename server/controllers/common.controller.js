const db = require("../models");
const config = require("../config/auth.config");
const Client = db.client;
const Role = db.role;
const Op = db.Sequelize.Op;
const ClientRate = db.clientRate;
// const monolizeObj = require("../api/monolizeObj")

exports.addNotes = (req, res) => {
    console.log(req.body)
};
