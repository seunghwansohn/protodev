import produce from 'immer'
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, takeEvery, call }                from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as role                                      from '../lib/api/role';


const initialState = {
    table : {
        header      : [],
        contents    : [],
        update      : false,
        clicked     : {}
    }
}

export const SET_HEADER             = 'role/SET_HEADER'
export const SET_INPUT_CHANGE       = 'role/SET_INPUT_CHANGE'
export const SET_UPDATE_CHANGE      = 'role/SET_UPDATE_CHANGE'
export const SET_CLICKED_TABLE_COL  = 'role/SET_CLICKED_TABLE_COL'

const [SET_ADD, SET_ADD_SUCCESS, SET_ADD_FAILURE ] 
= createRequestActionTypes('role/SET_ADD');
const [SET_UPDATE, SET_UPDATE_SUCCESS, SET_UPDATE_FAILURE ] 
= createRequestActionTypes('role/SET_UPDATE');
const [SET_LOAD, SET_LOAD_SUCCESS, SET_LOAD_ADD_FAILURE ] 
= createRequestActionTypes('role/SET_LOAD');
const [SET_DELETE, SET_DELETE_SUCCESS, SET_DELETE_FAILURE ] 
= createRequestActionTypes('role/SET_DELETE');
const [SET_SUBMIT_ADD_ITEM, SET_SUBMIT_ADD_ITEM_SUCCESS, SET_SUBMIT_ADD_ITEM_FAILURE ] 
= createRequestActionTypes('role/SET_SUBMIT_ADD_ITEM');

const addSaga           = createRequestSaga(SET_ADD, role.addNew);
const loadSaga          = createRequestSaga(SET_LOAD, role.load);
const updateSaga        = createRequestSaga(SET_UPDATE, role.update);
const deleteSaga        = createRequestSaga(SET_DELETE, role.del);
const addExpenseSaga    = createRequestSaga(SET_SUBMIT_ADD_ITEM, role.addNew);

export const actHeader          = createAction(SET_HEADER, columns => columns)
export const actAdd             = createAction(SET_ADD, (addedNew, primaryKey, includingKeys, findingKeys) => ({addedNew, primaryKey, includingKeys, findingKeys}))
export const actLoad            = createAction(SET_LOAD)
export const actUpdate          = createAction(SET_UPDATE, obj => obj)
export const actUpdateChange    = createAction(SET_UPDATE_CHANGE, ox => ox)
export const actClickedTableCol = createAction(SET_CLICKED_TABLE_COL, obj => obj)
export const actDelete          = createAction(SET_DELETE, (type, code) => ({type, code}))
export const actSubmitAddExpense   = createAction(SET_SUBMIT_ADD_ITEM, role => role)



export function* roleSaga() {
    yield takeEvery     (SET_ADD,    addSaga);
    yield takeLatest    (SET_LOAD,   loadSaga);
    yield takeEvery     (SET_UPDATE, updateSaga);
    yield takeEvery     (SET_DELETE, deleteSaga);
    yield takeLatest    (SET_SUBMIT_ADD_ITEM, addExpenseSaga);
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
                draft.table.clicked = action.payload
            })
        case SET_DELETE:
            return produce(state, draft => {
            })
        case SET_UPDATE:
            return produce(state, draft => {
            })

        default:
            return state;
    } 
}

export default reducer
