import produce from 'immer'
import { createAction, handleActions }                  from 'redux-actions';
import { takeEvery, takeLatest, call }                             from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes }   from '../lib/createRequestSaga';
import * as query                                      from '../lib/api/query';
import {unSequelizeKeys, unSequelizify}                 from '../lib/unSequelize';


const initialState = {
    item : {
    }
}

export const queryInitLoad = 'query/INIT_LOAD'

const [INIT_LOAD, INIT_LOAD_SUCCESS, INIT_LOAD_FAILURE ] 
= createRequestActionTypes('query/INIT_LOAD');

export const initLoad = createAction(INIT_LOAD, obj => obj)

const apiLoadSaga = createRequestSaga(INIT_LOAD, query.load);

export function* querySaga() {
    yield takeEvery(INIT_LOAD, apiLoadSaga);
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case INIT_LOAD_SUCCESS:
            return produce(state, draft =>{
                console.log()
            })

        case INIT_LOAD_FAILURE:
            return produce(state, draft =>{
                console.log(action)
            })

        default:
            return state;
    } 
}

export default reducer
