import axios from './axios';

export const addNotes = (obj) => axios.post('/api/' + obj.type + '/notes/add', {obj : obj});

export const loadNotes = () => axios.get('/api/notes/load');