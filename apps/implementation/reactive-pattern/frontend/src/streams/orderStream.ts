import { BehaviorSubject, Observable } from 'rxjs';
import apiClient from '../shared/api/apiClient';

interface OrderState { orders: any[]; loading: boolean; }

const initialState: OrderState = { orders: [], loading: false };
const orderSubject = new BehaviorSubject<OrderState>(initialState);

export const orderStream = {
  getState: () => orderSubject.getValue(),
  subscribe: (observer: (state: OrderState) => void) => orderSubject.subscribe(observer),
  loadOrders: async (userId: string) => {
    orderSubject.next({ ...orderSubject.getValue(), loading: true });
    const res = await apiClient.get('/orders', { params: { userId } });
    orderSubject.next({ orders: res.data, loading: false });
  },
  createOrder: async (userId: string, items: any[], total: number) => {
    await apiClient.post('/orders', { userId, items, total });
    // Reload orders after creation
    const res = await apiClient.get('/orders', { params: { userId } });
    orderSubject.next({ orders: res.data, loading: false });
  },
  get state$(): Observable<OrderState> { return orderSubject.asObservable(); },
};
