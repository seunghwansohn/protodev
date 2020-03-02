import axios from './axios';

// 로그인

export const addNew = (info) => axios.post('/api/maker/addNew', info);

export const load = () => axios.get('/api/maker/load');

export const update = (info) => axios.post('/api/maker/update', info);

export const del = (code) => axios.post('/api/maker/delete', {supplierCode:code});