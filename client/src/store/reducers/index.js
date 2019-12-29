import { combineReducers } from 'redux';
import itemList from './itemList'
import quoteList from './quoteList'
import mainSchBar from './mainSchBar'
import clients from './clients'
import quoteSubmit from './quoteSubmit'
import dialogs from './dialogs'


const rootReducer = combineReducers({
    itemList,
    quoteList,
    mainSchBar,
    clients,
    quoteSubmit,
    dialogs
});

export default rootReducer;