import Router from 'koa-router';
import * as itemsCtrl from './items.Ctrl'
import checkLoggedIn from '../../lib/checkLoggedIn'

const items = new Router();

items.post('/add', checkLoggedIn, itemsCtrl.write);

const post = new Router()

export default items;