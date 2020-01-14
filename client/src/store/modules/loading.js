import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
 요청을 위한 액션 타입을 payload로 설정합니다 (예: "sample/GET_POST")
*/

export const startLoading = createAction(
    START_LOADING,
    requestType => requestType
  );

export const finishLoading = createAction(
  FINISH_LOADING,
  requestType => requestType
);

const initialState = {};

const loading = handleActions(
  {
    [START_LOADING]: (state, action) => (
      console.log('스타트로딩'),
      // console.log('스타트로딩액션페이로드', action.payload), // 여기서 페이로드는 auth/LOGIN, 등으로 반환됨. 이후 컨테이너의 USEEFFECT를 통해 체크가 실행됨.
      {
      ...state,
      [action.payload]: true
    }),
    [FINISH_LOADING]: (state, action) => (
      console.log('피니시로딩'),
      console.log('피니시로딩액션페이로드', action.payload),
      {
      ...state,
      [action.payload]: false
    })
  },
  initialState
);

export default loading;
