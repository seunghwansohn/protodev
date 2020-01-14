import produce from 'immer'
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';
import * as item from '../../lib/api/item';
import { takeLatest, call } from 'redux-saga/effects';

// export const APILOAD = 'itemList/APILOAD';

const [
  APILOAD,
  APILOAD_SUCCESS,
  APILOAD_FAILURE,
] = createRequestActionTypes('itemList/APILOAD');

export const setApiLoad = createAction(APILOAD)

const apiLoadSaga = createRequestSaga(APILOAD, item.load);
export function* itemsSaga() {
  yield takeLatest(APILOAD, apiLoadSaga);
}

const initialState = {
    itemListArr: [],
    pickedCount: 0,
    pdfWorks : 
      {
        pdfBlobUrl : ''
      },
    quoteList:{
      SelectedCustomerCode : 'sdfsdf'
    }
};

function reducer (state = initialState, action) {
  switch (action.type) {
      case APILOAD_SUCCESS:
        const itemListArr = action.payload
        return produce(state, draft =>{
          draft.itemListArr = itemListArr
        })
      default:
        return state;
    } 
}

export default reducer
