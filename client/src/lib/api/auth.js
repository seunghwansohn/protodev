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