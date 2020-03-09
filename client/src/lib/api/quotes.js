import axios from './axios';

// 로그인

export const addNew = (info) => axios.post('/api/maker/addNew', info);

export const load = () => axios.get('/api/maker/load');

export const update = (info) => axios.post('/api/maker/update', info);

export const del = (obj) => axios.post('/api/' + obj.type + '/delete', obj);

const multer = require('multer');

const path = require('path');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + path.extname(file.originalname));
    }
  }),
});

export const upFiles = (file) => axios.post('/api/files', upload.single('image'), (req, res) => {
    let image = '/image/' + req.file.filename;
    res.send(image)
})