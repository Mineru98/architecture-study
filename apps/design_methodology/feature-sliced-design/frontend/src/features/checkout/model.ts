import { useCartStore } from '../../shared/store/cartStore';
import { createOrder } from '../../entities/order/api';
export const useCheckout = () => {
  const cart = useCartStore();
  return async () => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (!auth.user) throw new Error('Login required');
    await createOrder(auth.user.id, cart.items);
    cart.clearCart();
  };
};
