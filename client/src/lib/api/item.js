import axios from './axios';

// 로그인

export const addNew = (obj) => axios.post('/api/item/addNew', obj);

export const load = () => axios.get('/api/item/load');

export const update = (info) => axios.post('/api/item/update', info);

export const del = (obj) => axios.post('/api/' + obj.type + '/delete', obj);