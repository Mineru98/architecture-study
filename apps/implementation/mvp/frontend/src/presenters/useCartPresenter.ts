import { useCartStore } from '../shared/store/cartStore';
import { useAuthStore } from '../shared/store/authStore';
import { orderModel } from '../models/productModel';

export function useCartPresenter() {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCartStore();
  const user = useAuthStore((s) => s.user);

  // Presenter computes derived state and formats for view
  const formattedItems = items.map((item) => ({
    ...item,
    subtotalLabel: `${(item.price * item.quantity).toLocaleString()}원`,
  }));
  const totalLabel = `${getTotal().toLocaleString()}원`;
  const canCheckout = !!user && items.length > 0;

  const onCheckout = async () => {
    if (!user) return;
    await orderModel.createOrder({ userId: user.id, items, total: getTotal() });
    clearCart();
  };

  return { items: formattedItems, totalLabel, canCheckout, removeItem, updateQuantity, onCheckout };
}
