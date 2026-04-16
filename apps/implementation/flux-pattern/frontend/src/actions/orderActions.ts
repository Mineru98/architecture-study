import { dispatcher } from '../dispatcher/AppDispatcher';
import apiClient from '../shared/api/apiClient';

export const OrderActions = {
  loadOrders: async (userId: string) => {
    dispatcher.dispatch({ type: 'LOAD_ORDERS_START' });
    try {
      const orders = await apiClient.get('/orders', { params: { userId } }).then((r) => r.data);
      dispatcher.dispatch({ type: 'LOAD_ORDERS_SUCCESS', payload: { orders } });
    } catch {
      dispatcher.dispatch({ type: 'LOAD_ORDERS_ERROR' });
    }
  },

  createOrder: async (userId: string, items: any[], total: number) => {
    try {
      await apiClient.post('/orders', { userId, items, total });
      dispatcher.dispatch({ type: 'ORDER_CREATED', payload: {} });
      dispatcher.dispatch({ type: 'CART_CLEAR' });
    } catch {
      dispatcher.dispatch({ type: 'ORDER_CREATE_ERROR' });
    }
  },
};
