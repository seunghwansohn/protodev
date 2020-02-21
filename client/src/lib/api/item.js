<<<<<<< HEAD
import axios from './axios';

// 로그인
export const load = () => axios.get('/api/item/all');

export const newItem = (submitValues) => {
  return axios.post('/api/item/new', submitValues)
}

export const newCopied = (itemCode) => axios.post('/api/item/newCopied', {itemCode:itemCode})

// 회원가입
export const register = ({ username, password }) =>
  axios.post('/api/auth/signin', { username, password });

// 로그인 상태 확인
export const check = () => axios.get('/api/auth/check');

// 로그아웃
export const logout = () => axios.post('/api/auth/logout');

export const checkExistInDatabase = (table, checkVal) => axios.post('/api/item/checkExist', {table:table, checkVal:checkVal});

export const addItem = (item) => axios.post('/api/item/add', {item:item});
=======
import client from './client';

// 로그인
export const load = () => client.get('/api_s/customers');

// 회원가입
export const register = ({ username, password }) =>
  client.post('/api/auth/register', { username, password });

// 로그인 상태 확인
export const check = () => client.get('/api/auth/check');

// 로그아웃
export const logout = () => client.post('/api/auth/logout');
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
