const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));


//bodyParser를 통해 모든 서버-클라이언트 통신을 json으로
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))


const db = require("./models");
const Role = db.role;

db.sequelize.sync();

app.get('/', (req,res) => {
  res.send({message: "Welcome to bezkoder application." })
});


require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

const port = process.env.PORT || 5000;


//formidable 사용위해 필요한 코드
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
//--------------------------------



app.listen(port, () => console.log(`Lisn port ${port}`))