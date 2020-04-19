import axios from './axios';

// 로그인
export const addNew = (obj) => axios.post('/api/client/addNew', obj);

export const load = () => axios.get('/api/client/load');

export const update = (info) => axios.post('/api/client/update', info);

export const del = (obj) => axios.post('/api/' + obj.type + '/delete', obj);