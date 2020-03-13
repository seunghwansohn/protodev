import axios from './axios';

// 로그인

export const addNew = (info) => axios.post('/api/project/addNew', info);

export const load = () => axios.get('/api/project/load');

export const update = (info) => axios.post('/api/project/update', info);

export const del = (obj) => axios.post('/api/' + obj.type + '/delete', obj);