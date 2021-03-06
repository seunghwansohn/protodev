const db = require("../models");
const config = require("../config/auth.config");

const rmTimeFromReq = require("../lib/sequelMiddleWares");
const getIncludeName = require("../lib/getIncludeName");
const getIncludeNameFindOne = require("../lib/getIncludeNameFindOne");

const getIncludingArr = require("../lib/getIncludingArr");
const getIncludingAttr = require("../lib/getIncludingAttr");
const getFindingAttr = require("../lib/getFindingAttr");
const getIncludeAttrArr = require("../lib/getIncludeAttrArr");
const getMatchedAttr = require("../lib/getMatchedAttr");
const setUpdate = require("../lib/setUpdate");


  
const Op            = db.Sequelize.Op;
const primaryKey    = 'supplierCode'

const Supplier = db.supplier;
const SupplierNote = db.supplierNote;



const relAttr = {
    source : Supplier,
    rels : [
    //   {
    //     target: Supplier,
    //     asStr : 'supplier',
    //     attributes : ''
    //   },
    //   {
    //     target: ItemPrice,
    //     asStr : 'price',
    //     attributes :''
    //   }
    ]
}

const includingAttr = getIncludingAttr(relAttr)
const findingAttr   = getFindingAttr(relAttr)


exports.load = (req, res) => {
    // let findingAttr = []
    // let includingAttr = []
    getIncludeName(Supplier, primaryKey, findingAttr, includingAttr).then(items => {
        res.status(200).send(items)
    })
};



exports.addNew = (req, res) => {
  const Arr = req.body
  
  try {
    Arr.map(obj => {
        Supplier.create({
            supplierCode: obj.supplierCode,
            supplierName: obj.supplierName,
            country: obj.country,
            province: obj.province,
            ceo: obj.ceo,
            taxCode: obj.taxCode,
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


exports.addNotes = (req, res) => {
    // console.log(req.body)
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
    // console.log(req.params)
    SupplierNote.findAll({where : {supplierCode : req.params.id}}
    ).then(suppliers => {
        result = suppliers
    }).then(() => {
        res.status(200).send(result);
    })
};  


exports.load1 = (req, res) => {
    Supplier.findAll()
        .then(suppliers => {
            result = suppliers
        }).then(() => {
            res.status(200).send(result);
    })
};
  

exports.update = async (req, res) => {
    let data = req.body
    let { ref,vals } = data
    try {
        const draft = await Supplier.findOne({where:ref})
        keys = await Object.keys(vals)

        keys.map(async key => {
            draft[key] = vals[key]
        })
        await draft.save().then(() => {
            res.status(200).send('updated Successfully')
        })
    }
    catch (err) {
    }
};

exports.query1 = (req, res) => {

    const header = req.body.header
    const tempObj = {}
    tempObj[header] = req.body.value

    Supplier.findOne({where:tempObj})
    .then(res => {
        // console.log(res)
        result = res.dataValues
    }).then(() => res.status(200).send(result) )
};
  
exports.query = (req, res) => {
    let {queryObj} = req.body
    let where = queryObj

    getIncludeNameFindOne(Supplier, primaryKey, where, findingAttr, includingAttr).then(items => {
        res.status(200).send(items)
    })
};

exports.delete = async (req, res) => {
    console.log(req.body)
    // console.log(req.body)
    let draft = await Supplier.findOne({where:req.body})
    await draft.destroy();
};
  