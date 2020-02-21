import axios from './axios';

// 로그인
export const load = () => axios.get('/api/client/all');