import produce from 'immer'
import * as actionTypes from '../actions/actions';

const initialState = {
    searchKeyword: '',
    searchingNow: false,
};

function reducer (state = initialState, action) {
  switch (action.type) {
        case actionTypes.SEARCHKEYWORD:
            return produce(state, draft =>{
                draft.searchKeyword = action.searchKeyword
                draft.searchingNow = true
            })      
        case actionTypes.SETSEARCHINGNOW:
            return produce(state, draft => {
                draft.searchingNow = action.ox
            })  
        default:
            return state;
    } 
}

export default reducer;
