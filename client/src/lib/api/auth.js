<<<<<<< HEAD
import axios from './axios';

// 로그인
export const login = (username, password) => 
  axios.post('/api/auth/login', { username, password });

// 회원가입
export const register = ({ username, password }) =>
  axios.post('/api/auth/signup', { username, password });

// 로그인 상태 확인
export const check = (auth) => axios.post('/api/auth/check', auth);

// 로그아웃
export const logout = () => axios.post('/api/auth/logout');

export const signIn = ({username, password}) => 
  axios.post('/api/auth/signin', { username, password });
=======
import client from './client';

// 로그인
export const login = (username, password) => 
  client.post('/api/auth/login', { username, password });

// 회원가입
export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');

export const signIn = ({username, password}) => 
  client.post('/api/auth/signin', { username, password });
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
