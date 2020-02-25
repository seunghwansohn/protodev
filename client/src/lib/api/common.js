import axios from './axios';

export const addNotes = (obj) => axios.post('/api/notes/add', {obj : obj});