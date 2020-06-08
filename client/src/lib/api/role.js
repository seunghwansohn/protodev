import axios from './axios';

const config = {
    headers: {
      'x-access-token' : document.cookie
    },
}

export const addNew = (obj) => axios.post('/api/role/addNew', obj, config);

export const load = () => axios.get('/api/role/load', config);

export const update = (info) => axios.post('/api/role/update', info, config);

export const del = (obj) => axios.post('/api/' + obj.type + '/delete', obj, config);