import produce from 'immer'
import * as actionTypes from '../actions/actions';
import {delay, put, takeEvery, takeLatest, call} from 'redux-saga/effects'
import * as testApi from '../../lib/api/test'

const initialState = {
    quoteTotalValues :  {
        subTotal : 0,
        vat :  0,
        Total : 0,
    }
}

// console.log(test1)
function* testSaga () {
    {
        yield delay (1000)
        console.log('테스트 성공')
        const response = yield call(testApi.test1, null)
        console.log(response)
        console.log(response.data)
    }
}

export function* testSagaClick(){
    yield takeEvery(actionTypes.TEST, testSaga)
}

function test (state = initialState, action) {
    switch (action.type) {
          case actionTypes.TEST:
            //   return produce(state, draft =>{
            //       draft.searchKeyword = action.searchKeyword
            //       draft.searchingNow = true    

          default:
              return state;
      } 
  }
  
export default test;

  
  

