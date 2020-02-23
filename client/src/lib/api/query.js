import axios from './axios';

// 로그인
export const load = (payload) => {
    console.log(payload)
    axios.post('/api/item/query', {itemName : payload.payload});
}