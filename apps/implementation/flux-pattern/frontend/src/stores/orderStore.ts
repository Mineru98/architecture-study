import { dispatcher } from '../dispatcher/AppDispatcher';

let orders: any[] = [];
let loading = false;
type Listener = () => void;
const listeners: Listener[] = [];

export const OrderStore = {
  getOrders: () => orders,
  getLoading: () => loading,
  subscribe: (listener: Listener): (() => void) => {
    listeners.push(listener);
    return () => { const i = listeners.indexOf(listener); if (i >= 0) listeners.splice(i, 1); };
  },
  emitChange: () => listeners.forEach((l) => l()),
};

dispatcher.register((action: any) => {
  switch (action.type) {
    case 'LOAD_ORDERS_START':
      loading = true;
      OrderStore.emitChange();
      break;
    case 'LOAD_ORDERS_SUCCESS':
      orders = action.payload.orders;
      loading = false;
      OrderStore.emitChange();
      break;
    case 'ORDER_CREATED':
      loading = false;
      OrderStore.emitChange();
      break;
    case 'LOAD_ORDERS_ERROR':
    case 'ORDER_CREATE_ERROR':
      loading = false;
      OrderStore.emitChange();
      break;
  }
});
