const db = require("../models");
const config = require("../config/auth.config");
const monolize = require("../lib/monolizeSequel");
const calPrice = require("../lib/calPrice");
const rmTimeFromReq = require("../lib/sequelMiddleWares");
const getIncludeName = require("../lib/getIncludeName");
const getIncludeNameFindOne = require("../lib/getIncludeNameFindOne");

const getIncludingArr = require("../lib/getIncludingArr");
const getIncludingAttr = require("../lib/getIncludingAttr");
const getFindingAttr = require("../lib/getFindingAttr");


const getCreateObj = require("../lib/getCreateObj");
const setNameToCode = require("../lib/setNameToCode");

const {produce} = require ('immer')

const Maker = db.maker;
const MakerNote = db.makerNote;


const relAttr = {
    source : Maker,
    rels : [
    //   {
    //     target: Supplier,
    //     relType : 'finding',
    //     asStr : 'supplier',
    //     attributes : ['supplierName'],
    //     primaryCode : 'supplierCode'
    //   },
    //   {
    //     target: ItemPrice,
    //     relType : 'including',
    //     asStr : 'price',
    //     attributes :['VNPrice', 'stkVVar', 'buyingPKR', 'stkCVar']
    //   }
    ]
}

  
const includingAttr = getIncludingAttr(relAttr)
const findingAttr   = getFindingAttr(relAttr)


const Op = db.Sequelize.Op;
const primaryKey   = 'makerCode'


exports.addNew = (req, res) => {
    const Arr = req.body
    // console.log(Arr)
    try {
      Arr.map(obj => {
        Maker.create({
            makerCode: obj.makerCode,
            makerName: obj.makerName,
            origin: obj.origin,
        }).then(() => {
            res.send({ message: "Maker added successfully" });
        })
      })
    }
    catch (err) {
      res.status(500).send({message:err.message})
      console.log(err.message)
    }
};

exports.load = (req, res) => {

    const includingAttr = getIncludingAttr(relAttr)
    const findingAttr   = getFindingAttr(relAttr)
  
    getIncludeName(Maker, primaryKey, findingAttr, includingAttr).then(items => {
      res.status(200).send(items)
    })
  };

exports.delete = async (req, res) => {
    // console.log(req.body)
    let draft = await Maker.findOne({where:{makerCode :req.body.code}})
    await draft.destroy().then(()=> {
        res.status(200).send('deleted Successfully')
    });
};

exports.update = async (req, res) => {
    let data = req.body
    let { ref,vals } = data
    try {
        const draft = await Maker.findOne({where:ref})
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

exports.query = (req, res) => {
    let {queryObj} = req.body
    let where = queryObj

    getIncludeNameFindOne(Maker, primaryKey, where, findingAttr, includingAttr).then(items => {
        res.status(200).send(items)
    })
};
  
exports.addNotes = (req, res) => {
    const {obj} = req.body
    // console.log(obj)
    try {
        MakerNote.create({
            note: obj.note,
            makerCode : obj.primaryCode
        }).then(() => {
            res.send({type: obj.type + obj.randomNo, message: "Notes added successfully" });
        })
    }
        catch (err) {
            res.status(500).send({message:err.message})
            console.log(err.message)
    }
};

exports.loadNotes = (req, res) => {
    console.log('레큐파람은 ', req.params.id)
    MakerNote.findAll({where : {makerCode : req.params.id}}
    ).then(notes => {
        console.log(notes)
        result = notes
    }).then(() => {
        res.status(200).send(result);
    })
};  
  