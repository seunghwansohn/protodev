import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';

const axios = require('axios');

export const SETSEARCHINGNOW = 'itemList/SETSEARCHINGNOW'
export const SEARCHKEYWORD = 'itemList/SEARCHKEYWORD';

export const onSetSearchingNow = (ox) => ({type: SETSEARCHINGNOW, ox})
export const onSearch = searchKeyword => ({type: SEARCHKEYWORD, searchKeyword});

export function onFetchItem() {
    console.log('파하하')
    return function(callback) {
      return axios.get("/api_s/customers")
        .then(({ data }) => {
          callback(itemListFetchAction(data))
      });
    };
}
export const setSearchKeyword = createAction(SEARCHKEYWORD, setSearchKeyword => setSearchKeyword)

export const itemListFetchAction = (itemListArr) => ({type: APILOAD, itemListArr});

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
        default:
            return state;
    } 
}

export default reducer;
