const db = require("../models");
const config = require("../config/auth.config");

const Supplier = db.supplier;
const SupplierNote = db.supplierNote;

// const monolizeObj = require("../api/monolizeObj")

exports.addNotes = (req, res) => {
    // console.log(req.body)
    const {obj} = req.body
    const {type, notesArr, code} = obj
    try {
        notesArr.map(note => {
            SupplierNote.create({
                supplierCode: code,
                notes : note
            }).then(() => {
                res.send({ message: "supplier added successfully" });
            })
        })
    }
      catch (err) {
        res.status(500).send({message:err.message})
        console.log(err.message)
    }
};