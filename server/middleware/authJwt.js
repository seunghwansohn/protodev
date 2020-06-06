const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
// const cookieParser = require('cookie-parser')


verifyToken = (req, res, next) => {
  console.log('레스헤더쿠키스', req.cookies) 
  //상위에서 app.use(cookie-parser)가 선행되어야 함.
  let token = req.headers["x-access-token"];
  token = req.cookies.access_token
  console.log('쌩토큰은', token)
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    //userId는 이후의 미들웨어에서 roles와 users를 연결하는 외래키로 활용됨.
    next();
  });
};

isAdmin = (req, res, next) => {
  // console.log('레큐유저아이디', req.userId) // req.userId는 user_roles에 기록된 아이디넘버, 예를들어 21
  User.findByPk(req.userId).then(user => { //findByPk는 primary key를 통해 조회하는 메소드
    // console.log('유저', user)
    user.getRoles().then(roles => {
      console.log('롤스', roles) 
      //getRoles : belongsToMany를 통해 user_roles에서 roles를 조회
      //user_roles에서 한 id당 role은 여러개의 행을 가질 수 있음.
      //2개의 행에서 각각 1, 2의 role을 가지고 있으면 해당 유저는 1,2의 권한을 가짐.
      //아래의 for loop문은 반환받은 roles 값에 admin이 있나 확인
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
  User.findByPk(req.userId).then(user => {   
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