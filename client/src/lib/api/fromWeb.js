import axios from './axios';

export const exchangeRate = () => axios.get(
    'https://openexchangerates.org/api/latest.json?app_id=68fbadc91d31455aa5dd8cfb80da01fe');