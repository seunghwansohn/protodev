import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';

export const LOAD = 'form/LOAD'
export const SLIDER_STK_V_VAR = 'form/SLIDER_STK_V_VAR'
export const SLIDER_STK_C_VAR = 'form/SLIDER_STK_C_VAR'

export const load = createAction(LOAD, info => info)

export const sliderStKVVar = createAction(SLIDER_STK_V_VAR, value => value)
export const sliderStKCVar = createAction(SLIDER_STK_C_VAR, value => value)


const initialState = {
    buyingPrice: '',
    importTaxRate : '',
    importPrice : '',
    stkCVar : '',
    stkVVar : '',
    width : '',
    depth :'',
    height : '',
    weight : ''
};

function reducer (state = initialState, action) {
    switch (action.type) {
        case LOAD :
            return produce(state, draft => {
                console.log(action.payload)
                draft.itemName = action.payload.itemName
              })
        case SLIDER_STK_V_VAR :
        return produce(state, draft => {
            draft.stkVVar = action.payload
            })
        case SLIDER_STK_C_VAR :
        return produce(state, draft => {
            draft.stkCVar = action.payload
            })
        default:
          return state;
    } 
}

export default reducer
