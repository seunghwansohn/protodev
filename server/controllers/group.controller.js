const db = require("../models");
const config = require("../config/auth.config");

const {produce} = require ('immer')

const Role = db.role;
const User = db.user;
const Op = db.Sequelize.Op;


const getIncludeName = require("../lib/getIncludeName");

const getIncludingArr       = require("../lib/getIncludingArr");
const getIncludingManyAttr  = require("../lib/getIncludingManyAttr");
const getIncludingAttr      = require("../lib/getIncludingAttr");
const getFindingAttr        = require("../lib/getFindingAttr");
const getFilesAttr          = require("../lib/getFilesAttr");


const relAttr = {
    primaryKey : 'groupId',
    source : Role,
    rels : [
        {
            target: User,
            relType : 'includingMany',
            attributes :['username'],
            asStr : 'users'
        }
    ]
}

exports.test = (req, res) => {

  // Role.findOne({where:{id : 1}}).then(role => {
  //     role.getUsers().then(user => {
  //         console.log('유우저크크', user)
  //     })
  //     res.status(200).send(response)
  // })
  
  getIncludeName(relAttr).then(expenses => {
    res.status(200).send(expenses)
  })
  try {
      
      // Role.findAll(
      //     ).then(response => {
      //         console.log(response)
      //         res.status(200).send(response)
      //     })
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