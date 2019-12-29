import produce from 'immer'
import * as actionTypes from '../actions/actions';

const initialState = {
    findDialogsOpen : {
        VNBuyers : false
    }
};

function reducer (state = initialState, action) {
  switch (action.type) {
      case actionTypes.ON_DIALOG_OPEN:
        return produce(state, draft =>{
            draft.findDialogsOpen.VNBuyers = action.ox
        })
      default:
        return state;
    } 
}

export default reducer
