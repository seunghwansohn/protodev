import { combineReducers } from 'redux';
import itemList from './itemList'
import quoteList from './quoteList'
import mainSchBar from './mainSchBar'
import clients from './clients'

const rootReducer = combineReducers({
    itemList,
    quoteList,
    mainSchBar,
    clients
});

export default rootReducer;