const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
<<<<<<< HEAD
// const cookieParser = require('cookie-parser')


verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  token = req.cookies.access_token
=======

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
<<<<<<< HEAD
=======

>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
<<<<<<< HEAD
    //userId는 이후의 미들웨어에서 roles와 users를 연결하는 외래키로 활용됨.
=======
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    next();
  });
};

isAdmin = (req, res, next) => {
<<<<<<< HEAD
  // console.log('레큐유저아이디', req.userId) // req.userId는 user_roles에 기록된 아이디넘버, 예를들어 21
  User.findByPk(req.userId).then(user => { //findByPk는 primary key를 통해 조회하는 메소드
    // console.log('유저', user)
    user.getRoles().then(roles => {
      console.log('롤스', roles) 
      //getRoles : belongsToMany를 통해 user_roles에서 roles를 조회
      //user_roles에서 한 id당 role은 여러개의 행을 가질 수 있음.
      //2개의 행에서 각각 1, 2의 role을 가지고 있으면 해당 유저는 1,2의 권한을 가짐.
      //아래의 for loop문은 반환받은 roles 값에 admin이 있나 확인
=======
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
<<<<<<< HEAD
  User.findByPk(req.userId).then(user => {   
=======
  User.findByPk(req.userId).then(user => {
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;