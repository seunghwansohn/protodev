import { combineReducers } from 'redux';
import itemList from './itemListModule'
import quoteListModule from './quoteListModule'

const rootReducer = combineReducers({
    itemList,
    quoteListModule,
});

export default rootReducer;