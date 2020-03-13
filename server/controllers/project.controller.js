const db = require("../models");
const config = require("../config/auth.config");
const Project = db.project;
// const ProjectNote = db.projectNote;


const Op = db.Sequelize.Op;


exports.addNew = (req, res) => {
    const Arr = req.body
    console.log(Arr)
    try {
      Arr.map(obj => {
        Project.create({
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
    Project.findAll()
        .then(project => {
            result = project
        }).then(() => {
            res.status(200).send(result);
    })
};

exports.delete = async (req, res) => {
    console.log(req.body)
    let draft = await Project.findOne({where:{projectCode :req.body.code}})
    await draft.destroy().then(()=> {
        res.status(200).send('deleted Successfully')
    });
};

exports.update = async (req, res) => {
    let data = req.body
    let { ref,vals } = data
    try {
        const draft = await Project.findOne({where:ref})
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

    project.findOne({where:tempObj})
    .then(res => {
        console.log(res)
        result = res.dataValues
    }).then(() => res.status(200).send(result) )
};
  
exports.addNotes = (req, res) => {
    const {obj} = req.body
    console.log(obj)
    try {
        ProjectNote.create({
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
    ProjectNote.findAll({where : {projectCode : req.params.id}}
    ).then(notes => {
        console.log(notes)
        result = notes
    }).then(() => {
        res.status(200).send(result);
    })
};  
  