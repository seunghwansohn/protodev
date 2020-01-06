import Router from 'koa-router';
import * as itemsCtrl from './items.Ctrl'

const items = new Router();

items.post('/add', itemsCtrl.write);

export default items;