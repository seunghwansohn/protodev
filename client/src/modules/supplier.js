import produce from 'immer'
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as supplier                                      from '../lib/api/supplier';


const initialState = {
    table : {
        header : [],
        contents : []
    }
}

export const SET_HEADER       = 'supplier/SET_HEADER'
export const SET_INPUT_CHANGE = 'supplier/SET_INPUT_CHANGE'


const [SET_SUPPLIER_ADD, SET_SUPPLIER_ADD_SUCCESS, SET_SUPPLIER_ADD_FAILURE ] 
= createRequestActionTypes('supplier/SET_SUPPLIER_ADD');

const supplierAddSaga = createRequestSaga(SET_SUPPLIER_ADD, supplier.addNew);


export const setHeader = createAction(SET_HEADER, columns => columns)
export const setSupplierAdd = createAction(SET_SUPPLIER_ADD, info => info)
export const setInputChange = createAction(SET_INPUT_CHANGE, ({id, name, value}) => ({id, name, value}))

export function* supplierSaga() {
    yield takeLatest(SET_SUPPLIER_ADD, supplierAddSaga);
}


function reducer (state = initialState, action) {
    switch (action.type) {

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
        default:
            return state;
    } 
}

export default reducer
