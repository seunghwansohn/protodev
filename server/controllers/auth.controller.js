const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
<<<<<<< HEAD
=======
    email: req.body.email,
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
<<<<<<< HEAD
          user.setRoles(roles).then(() => { //setRoles 메소드는 아직도 뭔지 모르겠음.
=======
          user.setRoles(roles).then(() => {
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
<<<<<<< HEAD
=======
  console.log(req.body)
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
<<<<<<< HEAD
        return res.status(404).send({ message: "User Not found." });
      }

=======
        console.log('not user')
        return res.status(404).send({ message: "User Not found." });
      }
      console.log('user exist')
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
<<<<<<< HEAD
=======
        console.log('password not valid')
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
<<<<<<< HEAD

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: authorities,
          accessToken: token
        });
      });
=======
      console.log('password valid')
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      console.log('token is ' , token)
      var authorities = [];
      res.status(200).send({
        id: user.id,
        username: user.username,
        accessToken: token
      })
      // user.getRoles().then(roles => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
      //   res.status(200).send({
      //     id: user.id,
      //     username: user.username,
      //     email: user.email,
      //     roles: authorities,
      //     accessToken: token
      //   });
      // });
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
<<<<<<< HEAD
};

exports.check = (req, res) => {
  res.status(200).send({
    username : req.body.username
  })
};

exports.logout = (req, res) => {
  res.cookie('access_token')
  res.send('기기기')
=======
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
};