import apiClient from '../shared/api/apiClient';

export const productModel = {
  getProducts: (category?: string, page?: number) =>
    apiClient.get('/products', { params: { category, page } }).then((r) => r.data),
  getProduct: (id: string) =>
    apiClient.get(`/products/${id}`).then((r) => r.data),
};

export const orderModel = {
  getOrders: (userId: string) =>
    apiClient.get('/orders', { params: { userId } }).then((r) => r.data),
  createOrder: (data: any) =>
    apiClient.post('/orders', data).then((r) => r.data),
};

export const authModel = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }).then((r) => r.data),
};
