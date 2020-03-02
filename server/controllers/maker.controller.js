const db = require("../models");
const config = require("../config/auth.config");
const Maker = db.maker;

const Op = db.Sequelize.Op;

exports.loadMakers = (req, res) => {
    Maker.findAll()
        .then(makers => {
            result = makers
        }).then(() => {
            res.status(200).send(result);
    })
};