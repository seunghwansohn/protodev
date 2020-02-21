import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put } from 'redux-saga/effects';
import * as authtestAPI from '../lib/api/test';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

// const TABLELOAD = 'test/TABLELOAD'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인

const [AUTHTEST, AUTHTEST_SUCCESS, AUTHTEST_FAILURE] = createRequestActionTypes(
    'authtest/AUTHTEST'
  );

export const authtest = createAction(AUTHTEST);

const authtestAdminSaga = createRequestSaga(AUTHTEST, authtestAPI.loadUser);

export function* authtestSaga() {
  yield takeLatest(AUTHTEST, authtestAdminSaga);
}

const initialState = {
  table: null,
};

export default handleActions(
  {
    [AUTHTEST_SUCCESS]: (state, { payload: table }) => ({
      ...state,
      table,
    }),
  },
  initialState,
);
