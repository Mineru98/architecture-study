import { dispatcher } from '../dispatcher/AppDispatcher';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

let items: CartItem[] = [];
type Listener = () => void;
const listeners: Listener[] = [];

export const CartStore = {
  getItems: () => items,
  getTotal: () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  subscribe: (listener: Listener): (() => void) => {
    listeners.push(listener);
    return () => { const i = listeners.indexOf(listener); if (i >= 0) listeners.splice(i, 1); };
  },
  emitChange: () => listeners.forEach((l) => l()),
};

dispatcher.register((action: any) => {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const { item } = action.payload;
      const existing = items.find((i) => i.productId === item.productId);
      if (existing) {
        items = items.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        items = [...items, { ...item, quantity: 1 }];
      }
      CartStore.emitChange();
      break;
    }
    case 'CART_REMOVE_ITEM':
      items = items.filter((i) => i.productId !== action.payload.productId);
      CartStore.emitChange();
      break;
    case 'CART_UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        items = items.filter((i) => i.productId !== productId);
      } else {
        items = items.map((i) => (i.productId === productId ? { ...i, quantity } : i));
      }
      CartStore.emitChange();
      break;
    }
    case 'CART_CLEAR':
      items = [];
      CartStore.emitChange();
      break;
  }
});
