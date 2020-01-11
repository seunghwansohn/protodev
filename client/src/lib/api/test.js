import client from './client';

// 로그인
export const testx = ({ username, password }) =>
  client.post('/api/items/', { username, password });

export const test1 = () => client.get('/api/items');
