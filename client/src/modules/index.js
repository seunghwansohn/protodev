import { combineReducers }  from 'redux';
import {all}                from 'redux-saga/effects'

import item, {itemSaga}         from './itemList'
import quote, {quoteSaga}   from './quote'
import mainSearch               from './mainSearch'
import client, {clientSaga}   from './client'
import dialogs                  from './dialogs'
import loading                  from './loading';
import supplier, {supplierSaga} from './supplier';
import auth, { authSaga }       from './auth';
import user, { userSaga }       from './user';
import table, { tableSaga }     from './test';
import maker, { makerSaga }     from './maker';
import query, { querySaga }     from './query';
import project, { projectSaga } from './project';
import task, { taskSaga }       from './task';
import expense, {expenseSaga}   from './expense';
import role, {roleSaga}         from './role';


import common, { commonSaga}                   from './common';


import basicInfo, { basicInfoSaga }     from './basicInfo';
import { authtestSaga }         from './authtest';
import { reducer as formReducer } from 'redux-form'
import reduxFormInit from './reduxForm'

const rootReducer = combineReducers({
    item,
    quote,
    mainSearch,
    loading,
    client,
    dialogs,
    auth,
    user,
    table,
    form: formReducer,
    basicInfo,
    reduxFormInit,
    supplier,
    query,
    common,
    maker,
    project,
    task,
    basicInfo,
    expense,
    role
});

export function* rootSaga () {
    yield all([
        authSaga(),
        userSaga(),
        itemSaga(),
        tableSaga(),
        authtestSaga(),
        quoteSaga(),
        clientSaga(),
        basicInfoSaga(),
        supplierSaga(),
        querySaga(),
        commonSaga(),
        makerSaga(),
        projectSaga(),
        taskSaga(),
        expenseSaga(),
        roleSaga()
    ])
}

export default rootReducer;