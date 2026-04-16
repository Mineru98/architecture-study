import apiClient from '../shared/api/apiClient';

export const productModel = {
  fetchProducts: (category?: string, page?: number) =>
    apiClient.get('/products', { params: { category, page } }).then((r) => r.data),
  fetchProduct: (id: string) =>
    apiClient.get(`/products/${id}`).then((r) => r.data),
};

export const orderModel = {
  fetchOrders: (userId: string) =>
    apiClient.get('/orders', { params: { userId } }).then((r) => r.data),
  createOrder: (data: any) =>
    apiClient.post('/orders', data).then((r) => r.data),
};

export const authModel = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }).then((r) => r.data),
};
