import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
<<<<<<< HEAD
import { changeField, initializeForm, login, signIn } from '../modules/auth';
import AuthForm from '../components/auth/AuthForm';
import { check } from '../modules/user';

const LoginForm = ({history}) => { //여기서 history는 react-router-dom의 withRouter 요소.
//https://reacttraining.com/react-router/web/api/history  여기참조
  const [error, setError] = useState(null); 
  //리액트 stete. 일단 두개의 초기값을 null로 설정
  //useState는 함수형 콤포넌트에서 state사용하는 react Hook
=======
import { changeField, initializeForm, login, signIn } from '../store/modules/auth';
import AuthForm from '../components/auth/AuthForm';
import { check } from '../store/modules/user';

const LoginForm = ({history}) => { //여기서 history는 react-router-dom의 withRouter 요소.
//https://reacttraining.com/react-router/web/api/history  여기참조
  const [error, setError] = useState(null);
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => (
    {
    form: auth.login,
    auth: auth.auth,
    authError: auth.authError,
<<<<<<< HEAD
    user: user.user
=======
    user: user.user,
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { username, password } = form;
<<<<<<< HEAD
    dispatch(signIn({ username, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('로그인 실패');
      return;
    }
    if (auth) {
      dispatch(check(auth));
    }
  }, [auth, authError, dispatch]);
  useEffect(() => {
    if (user) {
      history.push('/');
      try {
        localStorage.setItem('user', user.username);
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, user]);
=======
    // dispatch(login({ username, password }));
    dispatch(signIn({ username, password }));
  };

  // // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  // useEffect(() => {
  //   dispatch(initializeForm('login'));
  // }, [dispatch]);

  // useEffect(() => {
  //   if (authError) {
  //     setError('로그인 실패');
  //     return;
  //   }
  //   if (auth) {
  //     dispatch(check());
  //   }
  // }, [auth, authError, dispatch]);

  // useEffect(() => {
  //   if (user) {
  //     history.push('/');
  //     try {
  //       localStorage.setItem('user', JSON.stringify(user));
  //     } catch (e) {
  //       console.log('localStorage is not working');
  //     }
  //   }
  // }, [history, user]);

>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
  return (
    <div> 
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
    </div>
  );
};

export default withRouter(LoginForm);
