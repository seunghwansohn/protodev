import { combineReducers } from 'redux';
import itemList from './itemList'
import quoteList from './quoteList'
import mainSchBar from './mainSchBar'

const rootReducer = combineReducers({
    itemList,
    quoteList,
    mainSchBar,
});

export default rootReducer;