import axios from './axios';

// 로그인
export const load = (payload) => {
    axios.post('/api/item/query', {itemName : payload.payload});
}