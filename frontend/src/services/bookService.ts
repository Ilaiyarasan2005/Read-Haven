
import api from './api';

export const getBooks = (params) => api.get('/books', { params });
export const addBook = (bookData) => api.post('/books', bookData);
