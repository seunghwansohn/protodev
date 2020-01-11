import produce from 'immer'
import * as actionTypes from '../actions/actions';
import {delay, put, takeEvery, takeLatest} from 'redux-saga/effects'

const initialState = {
    quoteTotalValues :  {
        subTotal : 0,
        vat :  0,
        Total : 0,
    }
}

function* testSaga () {
    {
        yield delay (1000)
        yield put(actionTypes.onTestSaga())
    }
}

export function* testSagaClick(){
    yield takeEvery(actionTypes.TEST, testSaga)
}

function test (state = initialState, action) {
    switch (action.type) {
          case actionTypes.TEST:
              console.log('테스트 성공')
            //   return produce(state, draft =>{
            //       draft.searchKeyword = action.searchKeyword
            //       draft.searchingNow = true    

          default:
              return state;
      } 
  }
  
export default test;

  
  

