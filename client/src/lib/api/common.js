import axios from './axios';

const config = {
  headers: {
    'x-access-token' : document.cookie
  }
}

export const addNotes = (obj) => axios.post(
  '/api/' + obj.type + '/notes/add',
  {obj : obj},
  config
);

export const loadNotes = () => axios.get('/api/notes/load');

export const fixNotes = (obj) => axios.post('/api/' + obj.type + '/notes/fix', {obj : obj});
