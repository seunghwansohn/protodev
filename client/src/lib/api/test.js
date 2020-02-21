<<<<<<< HEAD
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
=======
import client from './client';

// 로그인
export const testx = ({ username, password }) =>
  client.post('/api/items/', { username, password });

export const test1 = () => client.get('/api/items');
>>>>>>> e3e6576cc497ca7bbc3ab5e2aecee3a67a053329
