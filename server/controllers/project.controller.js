const db = require("../models");
const config = require("../config/auth.config");

const monolize = require("../lib/monolizeSequel");
const calPrice = require("../lib/calPrice");
const rmTimeFromReq = require("../lib/sequelMiddleWares");
const getIncludeName = require("../lib/getIncludeName");
const getIncludingArr = require("../lib/getIncludingArr");
const getIncludingAttr = require("../lib/getIncludingAttr");
const getFindingAttr = require("../lib/getFindingAttr");


const getCreateObj = require("../lib/getCreateObj");
const setNameToCode = require("../lib/setNameToCode");

const {produce} = require ('immer')

const Project = db.project;
const Note = db.projectNote;

const relAttr = {
    source : Project,
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

const Op = db.Sequelize.Op;
const primaryKey   = 'projectCode'


exports.addNew = (req, res) => {
    const Arr = req.body
    console.log(Arr)
    try {
      Arr.map(obj => {
        Main.create({
            projectCode: obj.projectCode,
            projectName: obj.projectName,
            client : obj.client,
        }).then(() => {
            res.send({ message: "project added successfully" });
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
  
    getIncludeName(Project, Project, primaryKey, findingAttr, includingAttr).then(items => {
      res.status(200).send(items)
    })
};

exports.load1 = (req, res) => {
  Note.findAll({
    include:[{model : Main, as : 'notes'}]
  }).then(project => {
          result = project
      }).then(() => {
          res.status(200).send(result);
  })
};

exports.loadDefault = (req, res) => {
    Main.findAll({
    }).then(project => {
            result = project
        }).then(() => {
            res.status(200).send(result);
    })
};

exports.delete = async (req, res) => {
    console.log(req.body)
    let draft = await Main.findOne({where:{projectCode :req.body.code}})
    await draft.destroy().then(()=> {
        res.status(200).send('deleted Successfully')
    });
};

exports.update = async (req, res) => {
    let data = req.body
    let { ref,vals } = data
    try {
        const draft = await Main.findOne({where:ref})
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

    const header = req.body.header
    const tempObj = {}
    tempObj[header] = req.body.value

    Main.findOne({where:tempObj})
    .then(res => {
        console.log(res)
        result = res.dataValues
    }).then(() => res.status(200).send(result) )
};
  
exports.addNotes = (req, res) => {
    const {obj} = req.body
    console.log(obj)
    try {
        Note.create({
            note: obj.note,
            projectCode : obj.primaryCode
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
    Note.findAll({where : {projectCode : req.params.id}}
    ).then(notes => {
        console.log(notes)
        result = notes
    }).then(() => {
        res.status(200).send(result);
    })
};  
  