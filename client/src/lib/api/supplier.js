import axios from './axios';

// 로그인

export const addNew = (info) => axios.post('/api/supplier/addNew', info);

export const load = () => axios.get('/api/supplier/load');

export const update = (info) => axios.post('/api/supplier/update', info);

export const del = (code) => axios.post('/api/supplier/delete', {supplierCode:code});
