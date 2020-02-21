import produce                                        from 'immer';
import { createAction, handleActions }                from 'redux-actions';
import { takeLatest, call }                           from 'redux-saga/effects';
import * as authAPI                                   from '../lib/api/auth';
import createRequestSaga, {createRequestActionTypes}  from '../lib/createRequestSaga';

const SETAUTHRESET    = "auth/SETAUTHRESET"
const CHANGE_FIELD    = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] 
= createRequestActionTypes('auth/REGISTER');
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] 
= createRequestActionTypes('auth/LOGIN');
const [SIGNIN, SIGNIN_SUCCESS, SIGNIN_FAILURE] 
= createRequestActionTypes('auth/SIGNIN');

// saga 생성
const registerSaga  = createRequestSaga(REGISTER, authAPI.register);
const loginSaga     = createRequestSaga(LOGIN, authAPI.login);
const signInSaga    = createRequestSaga(SIGNIN, authAPI.signIn);

export const setAuthReset   = createAction(SETAUTHRESET);
export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login
export const register       = createAction(REGISTER, ({ username, password }) => ({username, password}));
export const signIn         = createAction(SIGNIN, ({ username, password }) => ({username,password}));
export const changeField    = createAction(CHANGE_FIELD,({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);

export function* authSaga() {
  yield takeLatest(REGISTER,  registerSaga);
  yield takeLatest(LOGIN,     loginSaga);
  yield takeLatest(SIGNIN,    signInSaga);
}

const initialState = {
  register  : {
    username        : '',
    password        : '',
    passwordConfirm : ''
  },
  login     : {
    username        : '',
    password        : ''
  },
  auth      : null,
  authError : null,
  justNow   : false
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

    [REGISTER_SUCCESS]: (state, { payload: auth }) => (
      {
      ...state,
      authError: null,
      auth
    }),

    [REGISTER_FAILURE]: (state, { payload: error }) => (
      {
      ...state,
      authError: error
    }),

    [SIGNIN_SUCCESS]: (state, { payload: auth }) => 
        produce(state, draft => {
          document.cookie = `access_token=${auth.accessToken}`
          draft.authError = null;
          draft.auth      = auth;
          draft.justNow   = true;
    }),

    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
    produce(state, draft => {
      draft[form][key] = value; // 예: state.register.username을 바꾼다
    }),

    [SIGNIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: auth
    }),

    [SETAUTHRESET]: state => (
      {
        ...state,
        // auth:null,
        login:initialState.login
      }
    )
  },
  initialState
);

export default auth;
