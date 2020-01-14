import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../store/modules/loading';

export const createRequestActionTypes = type => {
  console.log('액션타입중')
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  console.log('크리에이트중')
  return function* (action) {
    console.log('뭐냐')
    yield put(startLoading(type)); // 로딩 시작
    try {
      console.log(action.payload)
      console.log(request)
      const response = yield call(request, action.payload);
      console.log(response)
      yield put({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (e) {
      console.log('실패')
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      });
    }
    yield put(finishLoading(type)); // 로딩 끝
  };
}