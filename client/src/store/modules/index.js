import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import user, { userSaga } from './user';
import test, { testSaga } from './test';
import loading from './loading';
import user, { userSaga } from './user';

const rootReducer = combineReducers({
  auth,
  loading,
  user
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), testSaga()]);
}

export default rootReducer;
