import React from 'react';
import LoginForm from '../containers/loginForm.js'
import AuthTemplate from '../components/auth/AuthTemplate';

const LoginPage = () => {
  return (
    <div>
      {/* <AuthTemplate> */}
        <LoginForm/>
      {/* </AuthTemplate> */}
    </div>

  );
};

export default LoginPage;
