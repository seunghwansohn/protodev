
import produce from 'immer'
import * as actionTypes from '../actions/actions';

const initialState = {
    VNbuyer : []
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case actionTypes.FETCHVNCUSTOMERS:
                return produce(state, draft => {
                draft.VNbuyer = action.VNCustomersList
                }) 
        default:
            return state;
    } 
}

export default reducer
