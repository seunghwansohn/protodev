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
  console.log('푸하하하');
  return function*(action) {
    yield put(startLoading(type)); // 로딩 시작
    try {
      console.log('리퀘스트', request)
      console.log('액션페이로드', action.payload)
      const response = yield call(request, action.payload);
      console.log('로긴성공')
      console.log('리스폰스', response)
      yield put({
        type: SUCCESS,
        payload: response.data
      });
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}
