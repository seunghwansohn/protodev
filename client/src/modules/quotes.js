import produce from 'immer'
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, takeEvery, call }                from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as quotes                                     from '../lib/api/quotes';


const initialState = {
    table : {
        header : [],
        contents : [],
        update : false
    }
}

export const SET_HEADER             = 'quotes/SET_HEADER'
export const SET_INPUT_CHANGE       = 'quotes/SET_INPUT_CHANGE'
export const SET_UPDATE_CHANGE      = 'quotes/SET_UPDATE_CHANGE'
export const SET_CLICKED_TABLE_COL  = 'quotes/SET_CLICKED_TABLE_COL'

const [SET_ADD, SET_ADD_SUCCESS, SET_ADD_FAILURE ] 
= createRequestActionTypes('quotes/SET_ADD');
const [SET_UPDATE, SET_UPDATE_SUCCESS, SET_UPDATE_FAILURE ] 
= createRequestActionTypes('quotes/SET_UPDATE');
const [SET_LOAD, SET_LOAD_SUCCESS, SET_LOAD_ADD_FAILURE ] 
= createRequestActionTypes('quotes/SET_LOAD');
const [SET_DELETE, SET_DELETE_SUCCESS, SET_DELETE_FAILURE ] 
= createRequestActionTypes('quotes/SET_DELETE');

const addSaga       = createRequestSaga(SET_ADD, quotes.addNew);
const loadSaga      = createRequestSaga(SET_LOAD, quotes.load);
const updateSaga    = createRequestSaga(SET_UPDATE, quotes.update);
const deleteSaga    = createRequestSaga(SET_DELETE, quotes.del);

export const setHeader          = createAction(SET_HEADER, columns => columns)
export const setAdd             = createAction(SET_ADD, info => info)
export const setLoad            = createAction(SET_LOAD)
export const setUpdate          = createAction(SET_UPDATE, arr => arr)
export const updateChange       = createAction(SET_UPDATE_CHANGE, ox => ox)
export const setClickedTableCol = createAction(SET_CLICKED_TABLE_COL, obj => obj)
export const setDelete          = createAction(SET_DELETE, (type, code) => ({type, code}))

export function* makerSaga() {
    yield takeLatest(SET_ADD,    addSaga);
    yield takeLatest(SET_LOAD,   loadSaga);
    yield takeEvery(SET_UPDATE, updateSaga);
    yield takeEvery (SET_DELETE, deleteSaga);
}


function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_UPDATE_CHANGE:
            return produce(state, draft => {
                draft.table.update = action.payload
            })
        case SET_HEADER:
            return produce(state, draft => {
                draft.table.header = action.payload
            })
        case SET_ADD_SUCCESS:
            return produce(state, draft => {
                draft.table.header = action.payload
                draft.table.update = true
            })
        case SET_UPDATE_SUCCESS:
            return produce(state, draft => {
                draft.table.update = true
            })
        case SET_DELETE_SUCCESS:
            return produce(state, draft => {
                draft.table.header = action.payload
                draft.table.update = true
            })
        case SET_CLICKED_TABLE_COL:
            return produce(state, draft => {
                console.log(action.payload)
            })
        case SET_DELETE:
            return produce(state, draft => {
                console.log(action.payload)
            })
        default:
            return state;
    } 
}

export default reducer
