import produce from 'immer'
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as client                                      from '../lib/api/client';
import {unSequelizeKeys, unSequelizify}                                      from '../lib/unSequelize';


const initialState = {
    table : {
        header : [],
        contents : []
    }
}

export const SET_HEADER = 'clients/SET_HEADER'
export const SET_INPUT_CHANGE = 'clients/SET_INPUT_CHANGE'

const [CLIENT_LOAD, CLIENT_LOAD_SUCCESS, CLIENT_LOAD_FAILURE ] 
= createRequestActionTypes('clients/CLIENT_LOAD');

export const setClientLoad = createAction(CLIENT_LOAD)
export const setHeader = createAction(SET_HEADER, columns => columns)
export const setInputChange = createAction(SET_INPUT_CHANGE, ({id, name, value}) => ({id, name, value}))

const apiLoadSaga = createRequestSaga(CLIENT_LOAD, client.load);

export function* clientsSaga() {
    yield takeLatest(CLIENT_LOAD, apiLoadSaga);
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case CLIENT_LOAD_SUCCESS:
            return produce(state, draft =>{
                let arrays = action.payload
                arrays.map(array => {
                    unSequelizeKeys(array)
                })
                draft.table.contents = arrays
            })
        case SET_HEADER:
            return produce(state, draft => {
                draft.table.header = action.payload
            })

        default:
            return state;
    } 
}

export default reducer
