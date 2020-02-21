import { combineReducers }  from 'redux';
import {all}                from 'redux-saga/effects'

import itemList, {itemsSaga}    from './itemList'
import quoteList, {quoteSaga}   from './quote'
import mainSearch               from './mainSearch'
import clients, {clientsSaga}   from './clients'
import dialogs                  from './dialogs'
import loading                  from './loading';
import auth, { authSaga }       from './auth';
import user, { userSaga }       from './user';
import table, { tableSaga }     from './test';
import basicInfo, { basicInfoSaga }     from './basicInfo';
import { authtestSaga }         from './authtest';
import { reducer as formReducer } from 'redux-form'
import reduxFormInit from './reduxForm'

const rootReducer = combineReducers({
    itemList,
    quoteList,
    mainSearch,
    loading,
    clients,
    dialogs,
    auth,
    user,
    table,
    form: formReducer,
    basicInfo,
    reduxFormInit
});

export function* rootSaga () {
    yield all([
        authSaga(),
        userSaga(),
        itemsSaga(),
        tableSaga(),
        authtestSaga(),
        quoteSaga(),
        clientsSaga(),
        basicInfoSaga(),

    ])
}

export default rootReducer;