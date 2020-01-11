import Router from 'koa-router';
import items from './items';
import auth from './auth';



const api = new Router();
api.use('/auth', auth.routes())

api.use('/items', items.routes());

export default api;