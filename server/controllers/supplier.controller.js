const db = require("../models");
const config = require("../config/auth.config");
const Supplier = db.supplier;
const SupplierNote = db.supplierNote;

exports.addNew = (req, res) => {
  const info = req.body
  console.log(info)
  try {
    Supplier.create({
        supplierCode: info.supplierCode,
        supplierName: info.supplierName,
        country: info.country,
        province: info.province,
        ceo: info.ceo,
        taxCode: info.taxCode,
      }).then(() => {
        req.body.notes.map(note => {
            SupplierNote.create({
                supplierCode: info.supplierCode,
                notes : note
            })
        })
        res.send({ message: "supplier added successfully" });
      })
  }

  catch (err) {
    res.status(500).send({message:err.message})
    console.log(err.message)
  }
};


exports.addNotes = (req, res) => {
    console.log(req.body)
    try {
        SupplierNote.create({
            notes: req.body.note,
            supplierCode : req.body.supplierCode
        }).then(() => {
            res.send({ message: "supplier added successfully" });
        })
    }
    catch (err) {
        res.status(500).send({message:err.message})
        console.log(err.message)
    }
};

exports.loadNotes = (req, res) => {
    console.log(req.params)
    SupplierNote.findAll({where : {supplierCode : 'fefef'}}
    ).then(suppliers => {
        result = suppliers
    }).then(() => {
        res.status(200).send(result);
    })
};


exports.loadSuppliers = (req, res) => {
    Supplier.findAll()
        .then(suppliers => {
            result = suppliers
        }).then(() => {
            res.status(200).send(result);
    })
};
  
exports.updateSuppliers = async (req, res) => {
    console.log(req.body[0].code)
    const jane = await Supplier.findOne({where:{supplierCode : req.body[0].code}})
    jane.supplierName = '개새끼'
    console.log(jane)
    await jane.save()
    // Supplier.update({})
    //     .then(suppliers => {
    //         result = suppliers
    //     }).then(() => {
    //         res.status(200).send(result);
    // })
};
  