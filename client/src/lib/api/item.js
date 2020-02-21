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