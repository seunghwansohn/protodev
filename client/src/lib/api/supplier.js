import axios from './axios';

// 로그인

export const addNew = (info) => axios.post('/api/supplier/addNew', info);