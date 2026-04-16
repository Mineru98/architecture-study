import { dispatcher } from '../dispatcher/AppDispatcher';

export const CartActions = {
  addItem: (item: { productId: string; name: string; price: number }) => {
    dispatcher.dispatch({ type: 'CART_ADD_ITEM', payload: { item } });
  },
  removeItem: (productId: string) => {
    dispatcher.dispatch({ type: 'CART_REMOVE_ITEM', payload: { productId } });
  },
  updateQuantity: (productId: string, quantity: number) => {
    dispatcher.dispatch({ type: 'CART_UPDATE_QUANTITY', payload: { productId, quantity } });
  },
  clearCart: () => {
    dispatcher.dispatch({ type: 'CART_CLEAR' });
  },
};
