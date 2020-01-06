import Router from 'koa-router';
import items from './items';

const api = new Router();

api.use('/items', items.routes());

export default api;