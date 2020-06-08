const db = require("../models");
const config = require("../config/auth.config");

const {produce} = require ('immer')

const Role = db.role;

const getIncludeName = require("../lib/getIncludeName");

const getIncludingArr = require("../lib/getIncludingArr");
const getIncludingAttr = require("../lib/getIncludingAttr");
const getFindingAttr = require("../lib/getFindingAttr");
const getFilesAttr   = require("../lib/getFilesAttr");


const relAttr = {
    source : Role,
    rels : [

    ]
}

const includingAttr = getIncludingAttr(relAttr)
const findingAttr   = getFindingAttr(relAttr)
const filesAttr     = getFilesAttr(relAttr)

exports.test = (req, res) => {
    const includingAttr = getIncludingAttr(relAttr)
    const findingAttr   = getFindingAttr(relAttr)
    const primaryKey   = 'groupId'

    getIncludeName(relAttr.source, primaryKey, findingAttr, includingAttr, filesAttr).then(expenses => {
        res.status(200).send(expenses)
    })
    try {
        Role.findAll(
            ).then(response => {
                console.log(response)
                res.status(200).send(response)
            })
    }
    catch (err) {
        res.status(500).send({message:err.message})
    }

    // res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};