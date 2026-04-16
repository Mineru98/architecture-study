import apiClient from '../../shared/api/apiClient';
export const loginApi = (email: string, password: string) => apiClient.post('/auth/login', { email, password }).then(r => r.data);
export const meApi = (token: string) => apiClient.get('/auth/me').then(r => r.data);
