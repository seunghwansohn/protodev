import produce                                        from 'immer'
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import createRequestSaga, {createRequestActionTypes } from '../lib/createRequestSaga';
import * as fromWeb                                   from '../lib/api/fromWeb';
import * as item                                      from '../lib/api/item';

const [EXCHANGE_RATE, EXCHANGE_RATE_SUCCESS, EXCHANGE_RATE_FAILURE ] 
= createRequestActionTypes('basicInfo/EXCHANGE_RATE');

const exchangeRateLoadSaga = createRequestSaga(EXCHANGE_RATE, fromWeb.exchangeRate);

export const getExchangeRate = createAction(EXCHANGE_RATE)

export function* basicInfoSaga() {
  yield takeLatest(EXCHANGE_RATE, exchangeRateLoadSaga);
}

const initialState = {
    exchangeRate : {}
};

function reducer (state = initialState, action) {

  switch (action.type) {
      
      case EXCHANGE_RATE_SUCCESS:
        return produce(state, draft =>{
          draft.exchangeRate.KRW = action.payload.rates.KRW
          draft.exchangeRate.VND = action.payload.rates.VND
        })      
      case EXCHANGE_RATE_FAILURE:
        return produce(state, draft =>{
        })              
      default:
        return state;
    } 
}

export default reducer
