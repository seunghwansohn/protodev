import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../store/modules/loading';

export const createRequestActionTypes = type => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return function*(action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      console.log(action)
      console.log(request)
      console.log(action.payload)
      const response = yield call(request, action.payload);
      yield put(
        console.log(response),
        {
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      console.log(e)
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}