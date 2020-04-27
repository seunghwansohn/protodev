import axios from './axios';

// 로그인

export const addNew = (obj) => axios.post('/api/expense/addNew', obj);

export const load = () => axios.get('/api/expense/load');

export const update = (info) => axios.post('/api/expense/update', info);

export const del = (obj) => axios.post('/api/' + obj.type + '/delete', obj);