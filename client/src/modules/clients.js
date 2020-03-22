import produce from 'immer'
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as client                                      from '../lib/api/client';
import {unSequelizeKeys, unSequelizify}                                      from '../lib/unSequelize';


const initialState = {
    table : {
        header : [],
        contents : [],
        filter : {
            keyword : ''
        }
    }
}

const [SET_ADD, SET_ADD_SUCCESS, SET_ADD_FAILURE ] 
= createRequestActionTypes('clients/SET_ADD');
const [SET_UPDATE, SET_UPDATE_SUCCESS, SET_UPDATE_FAILURE ] 
= createRequestActionTypes('clients/SET_UPDATE');
const [SET_LOAD, SET_LOAD_SUCCESS, SET_LOAD_ADD_FAILURE ] 
= createRequestActionTypes('clients/SET_LOAD');
const [SET_DELETE, SET_DELETE_SUCCESS, SET_DELETE_FAILURE ] 
= createRequestActionTypes('clients/SET_DELETE');
const [CLIENT_LOAD, CLIENT_LOAD_SUCCESS, CLIENT_LOAD_FAILURE ] 
= createRequestActionTypes('clients/CLIENT_LOAD');

export const SET_HEADER             = 'clients/SET_HEADER'
export const SET_INPUT_CHANGE       = 'clients/SET_INPUT_CHANGE'
export const SET_UPDATE_CHANGE      = 'clients/SET_UPDATE_CHANGE'
export const SET_CLICKED_TABLE_COL  = 'clients/SET_CLICKED_TABLE_COL'
export const SET_FILTER             = 'clients/SET_SET_FILTER'

export const setHeader      = createAction(SET_HEADER, columns => columns)
export const setInputChange = createAction(SET_INPUT_CHANGE, ({id, name, value}) => ({id, name, value}))

export const actHeader          = createAction(SET_HEADER, columns => columns)
export const actAdd             = createAction(SET_ADD, (addedNew, includingKeys) => ({addedNew, includingKeys}))
export const actLoad            = createAction(SET_LOAD)
export const actUpdate          = createAction(SET_UPDATE, arr => arr)
export const actUpdateChange    = createAction(SET_UPDATE_CHANGE, ox => ox)
export const actClickedTableCol = createAction(SET_CLICKED_TABLE_COL, obj => obj)
export const actDelete          = createAction(SET_DELETE, (type, code) => ({type, code}))
export const actSetFilter       = createAction(SET_FILTER, (compNo, type, value) => ({compNo, type, value}))

export function* clientsSaga() {
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
        case SET_FILTER:
            return produce(state, draft => {
                draft.table.filter[action.payload.compNo] = {}
                draft.table.filter[action.payload.compNo][action.payload.type] = action.payload.value
            })
    

        default:
            return state;
    } 
}

export default reducer
