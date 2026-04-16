import { useState, useEffect, useCallback } from 'react';
import { orderModel } from '../models/productModel';
import { useAuthStore } from '../shared/store/authStore';
import { useCartStore } from '../shared/store/cartStore';

export function useOrderController() {
  const [orders, setOrders] = useState([]);
  const user = useAuthStore((s) => s.user);

  const loadOrders = useCallback(async () => {
    if (user) {
      const data = await orderModel.fetchOrders(user.id);
      setOrders(data);
    }
  }, [user]);

  useEffect(() => { loadOrders(); }, [loadOrders]);

  const checkout = async () => {
    const items = useCartStore.getState().items;
    const total = useCartStore.getState().getTotal();
    if (!user || items.length === 0) return;
    await orderModel.createOrder({ userId: user.id, items, total });
    useCartStore.getState().clearCart();
    loadOrders();
  };

  return { orders, checkout };
}
