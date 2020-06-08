const db = require("../models");
const config = require("../config/auth.config");

const {produce} = require ('immer')

const Role = db.role;


exports.test = (req, res) => {
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