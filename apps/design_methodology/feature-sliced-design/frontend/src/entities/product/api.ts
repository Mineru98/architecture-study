import apiClient from '../../shared/api/apiClient';
export const fetchProducts = (category?: string, page?: number) => apiClient.get('/products', { params: { category, page } }).then(r => r.data);
export const fetchProduct = (id: string) => apiClient.get(`/products/${id}`).then(r => r.data);
