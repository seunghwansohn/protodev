import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as tableAPI from '../lib/api/test';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

// const TABLELOAD = 'test/TABLELOAD'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인

const [TABLELOAD, TABLELOAD_SUCCESS, TABLELOAD_FAILURE] = createRequestActionTypes(
    'test/TABLELOAD'
  );

export const tableLoad = createAction(TABLELOAD);

const tableLoadSaga = createRequestSaga(TABLELOAD, tableAPI.load);

export function* tableSaga() {
  yield takeLatest(TABLELOAD, tableLoadSaga);
}

const initialState = {
  table: null,
};

export default handleActions(
  {
    [TABLELOAD_SUCCESS]: (state, { payload: table }) => ({
      ...state,
      table,
    }),
  },
  initialState,
);
