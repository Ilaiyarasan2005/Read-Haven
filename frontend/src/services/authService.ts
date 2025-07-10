
import api from './api';

export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const adminLogin = (credentials) => api.post('/auth/admin/login', credentials);
