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
  
exports.updateSuppliers = (req, res) => {
    let data = req.body
    data.map(async (obj) => {
        let draft = await Supplier.findOne({where:{supplierCode : obj['code']}})
        draft.supplierName = await obj['supplierName']
        await draft.save()
    }).then(
        res.status(200).send('Update Successfully')
    )
};

exports.querySuppliers = (req, res) => {

    const header = req.body.header
    const tempObj = {}
    tempObj[header] = req.body.value

    Supplier.findOne({where:tempObj})
    .then(res => {
        console.log(res)
        result = res.dataValues
    }).then(() => res.status(200).send(result) )
};
  
exports.deleteSuppliers = async (req, res) => {
    let draft = await Supplier.findOne({where:req.body})
    await draft.destroy();
};
  