import produce from 'immer'
import * as actionTypes from '../actions/actions';

const initialState = {
    quoteTotalValues :  {
        subTotal : 0,
        vat :  0,
        Total : 0,
    }
}

function reducer (state = initialState, action) {
    switch (action.type) {
          case actionTypes.SEARCHKEYWORD:
              return produce(state, draft =>{
                  draft.searchKeyword = action.searchKeyword
                  draft.searchingNow = true
              })      

          default:
              return state;
      } 
  }
  
  export default reducer;
  