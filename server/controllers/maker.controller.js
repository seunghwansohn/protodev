const db = require("../models");
const config = require("../config/auth.config");
const Maker = db.maker;

const Op = db.Sequelize.Op;


exports.addNew = (req, res) => {
    const Arr = req.body
    console.log(Arr)
    try {
      Arr.map(obj => {
        Maker.create({
            makerCode: obj.makerCode,
            makerName: obj.makerName,
            origin: obj.origin,
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

exports.load = (req, res) => {
    Maker.findAll()
        .then(makers => {
            result = makers
        }).then(() => {
            res.status(200).send(result);
    })
};

exports.delete = async (req, res) => {
    console.log(req.body)
    let draft = await Maker.findOne({where:{makerCode :req.body.code}})
    await draft.destroy().then(()=> {
        res.status(200).send('deleted Successfully')
    });
};

exports.update = async (req, res) => {
    let data = req.body
    let { ref,vals } = data
    console.log(ref)
    console.log(vals)
    try {
        const draft = await Maker.findOne({where:ref})
        console.log(draft.makerName)
        keys = await Object.keys(vals)

        keys.map(async key => {
            console.log(key)
            console.log(vals[key])
            draft[key] = vals[key]
        })
        await draft.save()
    }
    catch (err) {

    }
};