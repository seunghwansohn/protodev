import { combineReducers } from 'redux';
import {all} from 'redux-saga/effects'

import items from './items'
// import quoteList from './quoteList'
import mainSearch from './mainSearch'
// import clients from '../reducers/clients'
// import quoteSubmit from '../reducers/quoteSubmit'
// import dialogs from '../reducers/dialogs'

// import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';



const rootReducer = combineReducers({
    items,
    // quoteList,
    mainSearch,
    // clients,
    // quoteSubmit,
    // dialogs,
    // testSaga,
    // loading,
    auth,
    user,
    
});

export function* rootSaga () {
    yield all([authSaga(), userSaga()])
}

export default rootReducer;