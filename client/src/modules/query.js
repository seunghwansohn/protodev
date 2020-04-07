import produce from 'immer'
import { createAction, handleActions }                  from 'redux-actions';
import { takeEvery, takeLatest, call }                             from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes }   from '../lib/createRequestSaga';
import * as query                                      from '../lib/api/query';
import {unSequelizeKeys, unSequelizify}                 from '../lib/unSequelize';


const initialState = {
}

export const queryInitLoad = 'query/INIT_LOAD'
export const SET_QUERY = 'query/SET_QUERY'
export const SET_SELECT = 'query/SET_SELECT'
export const SET_FRAME = 'query/SET_FRAME'
export const SET_REQNO = 'query/SET_REQNO'
export const SET_ADD_NEW_BLANK = 'query/SET_ADD_NEW_BLANK'




const [INIT_LOAD, INIT_LOAD_SUCCESS, INIT_LOAD_FAILURE ] 
= createRequestActionTypes('query/INIT_LOAD');

export const initLoad = createAction(INIT_LOAD, obj => obj)
export const actQuery = createAction(SET_QUERY, (frameNo, type, title, value) => ({frameNo, type, title, value}))
export const actSelect = createAction(SET_SELECT, (frameNo, reqType, key, selected) => ({frameNo, reqType, key, selected}))
export const actSetFrame = createAction(SET_FRAME, frameNo => frameNo)
export const actSetReqNo = createAction(SET_REQNO, (frameNo, reqNo) => ({frameNo, reqNo}))
export const actAddNewBlankQuery = createAction(SET_ADD_NEW_BLANK, frameNo => frameNo)



const apiLoadSaga = createRequestSaga(INIT_LOAD, query.load);

export function* querySaga() {
    yield takeEvery(INIT_LOAD, apiLoadSaga);
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case INIT_LOAD_SUCCESS:
            return produce(state, draft =>{
            })

        case INIT_LOAD_FAILURE:
            return produce(state, draft =>{
            })
        
        case SET_QUERY:
            return produce(state, draft =>{
                const {frameNo, type, title, value} = action.payload
                draft[frameNo] = draft[frameNo] ? draft[frameNo] : {}
                draft[frameNo][type]  =draft[frameNo][type] ? draft[frameNo][type] : {}
                draft[frameNo][type][title] = value
            })

        case SET_FRAME:
            return produce(state, draft =>{
                let frameNo = action.payload
                draft[frameNo] = {}
                draft[frameNo].newAdded = []
            })
        case SET_REQNO:
            return produce(state, draft =>{
                let {frameNo, reqNo} = action.payload
                draft[frameNo][reqNo] = {}
            })
        case SET_ADD_NEW_BLANK:
            return produce(state, draft =>{
                let frameNo = action.payload
                draft[frameNo].newAdded.push({})
            })
        case SET_SELECT:
            return produce(state, draft =>{
                const {frameNo, reqType, key, selected} = action.payload
                console.log(frameNo, reqType, key, selected)
                draft[frameNo][reqType][key]  = selected ? selected : {}
                // draft[frameNo][type][title] = value
            })

        default:
            return state;
    } 
}

export default reducer
