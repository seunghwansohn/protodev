const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

//formidable 사용위해 필요한 코드
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
//--------------------------------

//bodyParser를 통해 모든 서버-클라이언트 통신을 json으로
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

app.get('/api_s/hello', (req,res) => {
    res.send({message: 'hello exp00'})
});
//-----------------------


//filetest1에 접속시 get으로 파일 업로드 형식의 페이지 불러오기
app.get('/filetest1', function (req, res){
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/filetest1" enctype="multipart/form-data" method="post">'+  //post형식의 파일 업로드 폼. multipart가 파일 포함 형식
      '<input type="file" name="upload" multiple><br>'+
      '<input type="submit" value="Upload">'+
    '</form>'
  );
});
//---------------------


//filetest1 페이지에서 업로드한 파일을 server와 동일한 폴더 아래의 uploads폴더에 집어넣음.
app.post('/filetest1', function (req, res){
  var form = new formidable.IncomingForm();
  form.parse(req);
  form.on('fileBegin', function (name, file){
      file.path = __dirname + '/uploads/' + file.name;
  });

  form.on('file', function (name, file){
      console.log('Uploaded ' + file.name);
  });
  //업로드 완료 후 다시 원래 페이지 띄워줌.
  res.writeHead(200, {'content-type': 'text/html'});
  res.end(  
    '<form action="/filetest1" enctype="multipart/form-data" method="post">'+
      '<input type="file" name="upload" multiple><br>'+
      '<input type="submit" value="Upload">'+
    '</form>'
  );
});


//quoteList 제출 api 만들기
app.post('/api_s/quoteSubmit', function (req, res){
  req.body.map(input => {
    connection.query(
      `INSERT INTO \`Sell Quotes\` (\`No\`, \`Project\`, \`ItemCode\`, \`Qty\`) VALUES ('${input.no}', 'kvi', '${input.itemCode}', '1')`,
    (err, rows, fields) => {
    console.log(rows)
    })
  })
});
//-----------------------

//mysql-repl api 서버 만들기
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();
//---------------

//api/customers에 접속하면 json형식으로 mysql의 쿼리값을 받아오기
app.get('/api_s/customers', (req, res) => {
    connection.query(
      'SELECT * FROM itemList',
      (err, rows, fields) => {
      console.log(rows)
      res.send(rows);
      }
    )
});

app.get('/api_s/VNCustomers', (req, res) => {
  connection.query(
    'SELECT * FROM VnCustomers',
    (err, rows, fields) => {
    res.send(rows);
    }
  )
});



app.listen(port, () => console.log(`Lisn port ${port}`))