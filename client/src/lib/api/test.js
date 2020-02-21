import axios from './axios';

// 로그인
export const load = () =>
  axios.get('/api/item/all');

export const loadAdmin = () =>
  axios.get('/api/test/admin')

export const loadUser = () =>
axios.get('/api/test/user')

export const loadAll = () =>
axios.get('/api/test/all')