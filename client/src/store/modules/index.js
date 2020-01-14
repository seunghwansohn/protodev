import { combineReducers } from 'redux';
import {all} from 'redux-saga/effects'

import items from './items'
import quote from './quote'
import mainSearch from './mainSearch'
import {itemsSaga} from './items'

import clients from './clients'
// import quoteSubmit from './quoteSubmit'
import dialogs from './dialogs'


import loading from './loading';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';



const rootReducer = combineReducers({
    items,
    quote,
    mainSearch,
    clients,
    // quoteSubmit,
    dialogs,
    auth,
    loading,
    user,
});

export function* rootSaga () {
    yield all([authSaga(), userSaga(), itemsSaga()])
}

export default rootReducer;