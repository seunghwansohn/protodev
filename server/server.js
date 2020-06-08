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

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });


app.get('/', (req,res) => {
  res.send({message: "Welcome to bezkoder application." })
});

app.use(express.static('public'));

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/item.routes')(app)
require('./routes/quote.routes')(app)
require('./routes/client.routes')(app)
require('./routes/supplier.routes')(app)
require('./routes/common.routes')(app)
require('./routes/maker.routes')(app)
// require('./routes/quotes.routes')(app)
require('./routes/project.routes')(app)
require('./routes/task.routes')(app)
require('./routes/expense.routes')(app)
require('./routes/expenseSort.routes')(app)
require('./routes/uploadFile.routes')(app)
require('./routes/role.routes')(app)



const port = process.env.PORT || 5000;


//formidable 사용위해 필요한 코드
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
//--------------------------------



app.listen(port, () => console.log(`Lisn port ${port}`))

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });
 
//   Role.create({
//     id: 2,
//     name: "moderator"
//   });
 
//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }