import { combineReducers } from 'redux';
import {all} from 'redux-saga/effects'

import itemList from './itemList'
import quoteList from './quoteList'
import mainSchBar from './mainSchBar'
import clients from './clients'
import quoteSubmit from './quoteSubmit'
import dialogs from './dialogs'

import testSaga, { testSagaClick } from './testSaga'
import auth, { authSaga } from '../modules/auth';
import user, { userSaga } from '../modules/user';


const rootReducer = combineReducers({
    itemList,
    quoteList,
    mainSchBar,
    clients,
    quoteSubmit,
    dialogs,
    testSaga,
    auth,
    user,
});

export function* rootSaga () {
    yield all([testSagaClick(), authSaga(), userSaga()])
}

export default rootReducer;