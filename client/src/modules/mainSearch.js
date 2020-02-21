import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';
import * as item from '../lib/api/item';
import { takeLatest, call } from 'redux-saga/effects';
import createRequestSaga, {
    createRequestActionTypes,
  } from '../lib/createRequestSaga';

const axios = require('axios');

export const SETSEARCHINGNOW = 'itemList/SETSEARCHINGNOW'
export const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';

// export const onSetSearchingNow = (ox) => ({type: SETSEARCHINGNOW, ox})
// export const onSearch = searchKeyword => ({type: SEARCHKEYWORD, searchKeyword});

export const onSearch = createAction(SEARCHKEYWORD, searchKeyword => searchKeyword)

export const setSearchKeyword = createAction(SEARCHKEYWORD, searchKeyword => searchKeyword)



// export const itemListFetchAction = (itemListArr) => ({type: APILOAD, itemListArr});

const initialState = {
    searchKeyword: '',
    searchingNow: false,
};

function reducer (state = initialState, action) {
  switch (action.type) {
        case SEARCHKEYWORD:
            const searchKeyword = action.payload
            return produce(state, draft =>{
                draft.searchKeyword = searchKeyword
                draft.searchingNow = true
            })      
        case SETSEARCHINGNOW:
            return produce(state, draft => {
                draft.searchingNow = action.ox
            })  
        // case APILOAD:
        //     console.log('API로드')
            // return produce(state, draft => {
            //     draft.searchingNow = action.ox
            // })  
        
        default:
            return state;
    } 
}

export default reducer;
