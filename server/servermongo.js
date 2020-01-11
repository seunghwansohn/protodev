require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './src/api';

// import jwtMiddleware from './lib/jwtMiddleware'

const {PORT, MONGO_URI} = process.env;

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => {
        console.error(e);
    });

const app = {}
app.koa = new Koa()
const router = new Router();


//라우터 설정
router.use('/api', api.routes()) //api 라우트 적용

//라우터 적용 전에 bodyParser 적용
app.koa.use(bodyParser())

//토큰 처리를 위해 jwtMiddleware 적용 -> 반드시 라우터 전에 적용해야함.
// app.koa.use(jwtMiddleware)

//app 인스턴스에 라우터 적용
app.koa.use(router.routes()).use(router.allowedMethods())

const port = PORT||4000; //PORT가 규정되 있으면 규정된 PORT로 없으면 4000으로.
app.koa.listen(4000,() => {
    console.log('Listening to %d', port)
})
