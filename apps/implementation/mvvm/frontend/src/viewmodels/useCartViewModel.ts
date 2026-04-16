import { useMemo } from 'react';
import { useCartStore } from '../shared/store/cartStore';
import { useAuthStore } from '../shared/store/authStore';
import { orderModel } from '../models/productModel';

export function useCartViewModel() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const user = useAuthStore((s) => s.user);

  // ViewModel: derived computations
  const itemCount = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const isEmpty = items.length === 0;
  const canCheckout = !!user && !isEmpty;

  const checkout = async () => {
    if (!canCheckout) return;
    await orderModel.createOrder({ userId: user!.id, items, total: getTotal() });
    clearCart();
  };

  return { items, itemCount, isEmpty, canCheckout, total: getTotal(), removeItem, updateQuantity, checkout };
}
