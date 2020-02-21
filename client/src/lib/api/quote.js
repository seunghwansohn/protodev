import axios from './axios';

export const recordQuote = (payload) =>
  axios.post('/api/quote/record', payload);

