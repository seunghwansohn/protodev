import produce from 'immer'
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as supplier                                      from '../lib/api/supplier';


const initialState = {
    table : {
        header : [],
        contents : [],
        update : false
    }
}

export const SET_HEADER         = 'supplier/SET_HEADER'
export const SET_INPUT_CHANGE   = 'supplier/SET_INPUT_CHANGE'
export const SET_UPDATE_CHANGE  = 'supplier/SET_UPDATE_CHANGE'

const [SET_SUPPLIER_ADD, SET_SUPPLIER_ADD_SUCCESS, SET_SUPPLIER_ADD_FAILURE ] 
= createRequestActionTypes('supplier/SET_SUPPLIER_ADD');
const [SET_UPDATE_SUPPLIERS, SET_UPDATE_SUPPLIERS_SUCCESS, SET_UPDATE_SUPPLIERS_FAILURE ] 
= createRequestActionTypes('supplier/SET_UPDATE_SUPPLIERS');
const [SET_LOAD, SET_LOAD_SUCCESS, SET_LOAD_ADD_FAILURE ] 
= createRequestActionTypes('supplier/SET_LOAD');

const supplierAddSaga       = createRequestSaga(SET_SUPPLIER_ADD, supplier.addNew);
const supplierLoadSaga      = createRequestSaga(SET_LOAD, supplier.load);
const supplierUpdateSaga    = createRequestSaga(SET_UPDATE_SUPPLIERS, supplier.update);

export const setHeader          = createAction(SET_HEADER, columns => columns)
export const setSupplierAdd     = createAction(SET_SUPPLIER_ADD, info => info)
export const setSupplierLoad    = createAction(SET_LOAD)
export const setSupplierUpdate  = createAction(SET_UPDATE_SUPPLIERS, info => info)
export const updateChange       = createAction(SET_UPDATE_CHANGE, ox => ox)

export function* supplierSaga() {
    yield takeLatest(SET_SUPPLIER_ADD, supplierAddSaga);
    yield takeLatest(SET_LOAD, supplierLoadSaga);
    yield takeLatest(SET_UPDATE_SUPPLIERS, supplierUpdateSaga);
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
        case SET_SUPPLIER_ADD_SUCCESS:
            return produce(state, draft => {
                draft.table.header = action.payload
            })
        case SET_SUPPLIER_ADD:
            return produce(state, draft => {
                console.log(action.payload)
            })
        case SET_UPDATE_SUPPLIERS_SUCCESS:
            return produce(state, draft => {
                draft.table.update = true
            })
        default:
            return state;
    } 
}

export default reducer
