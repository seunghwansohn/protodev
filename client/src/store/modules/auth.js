import produce from 'immer';

import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../../lib/createRequestSaga';


const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER'
);
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);
const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] = createRequestActionTypes(
  'auth/SIGNIN'
);

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);

export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login
export const register = createAction(REGISTER, ({ username, password }) => ({
  username,
  password
}));

export const login = createAction(LOGIN, ({ username, password }) => (
  {
  username,ru
  password
}));

export const signIn = createAction(SIGNIN, ({ username, password }) => (
  {
  username,
  password
}));

// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const signInSaga = createRequestSaga(SIGNIN, authAPI.signIn);

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(SIGNIN, signInSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: ''
  },
  login: {
    username: '',
    password: ''
  },
  auth: null,
  authError: null
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, draft => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => (
      {
      ...state,
      authError: null,
      auth
    }),
    // 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => (
      {
      ...state,
      authError: error
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => (
      {
      ...state,
      authError: null,
      auth
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    }),
    [SIGNIN_SUCCESS]: (state, { payload: auth }) => (
      {
      ...state,
      authError: null,
      auth
    }),
    // 로그인 실패
    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error
    })

  },
  initialState
);

export default auth;