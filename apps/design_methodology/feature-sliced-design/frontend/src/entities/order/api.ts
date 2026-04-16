import apiClient from '../../shared/api/apiClient';
export const fetchOrders = (userId?: string) => apiClient.get('/orders', { params: { userId } }).then(r => r.data);
export const createOrder = (userId: string, items: any[]) => apiClient.post('/orders', { userId, items }).then(r => r.data);
export const updateOrderStatus = (id: string, status: string) => apiClient.patch(`/orders/${id}/status`, { status }).then(r => r.data);
