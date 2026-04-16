import { useState, useEffect, useCallback } from 'react';
import { orderModel } from '../models/productModel';
import { useAuthStore } from '../shared/store/authStore';
import { ORDER_STATUS_MAP } from '../shared/constants';

export function useOrdersPresenter() {
  const [orders, setOrders] = useState<any[]>([]);
  const user = useAuthStore((s) => s.user);

  const load = useCallback(async () => {
    if (!user) return;
    const data = await orderModel.getOrders(user.id);
    setOrders(data);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  // Presenter formats orders for the view
  const formattedOrders = orders.map((o) => ({
    ...o,
    statusLabel: ORDER_STATUS_MAP[o.status] || o.status,
    totalLabel: `${Number(o.total).toLocaleString()}원`,
    itemSummary: (o.items as any[]).map((i) => `${i.name} x${i.quantity}`).join(', '),
  }));

  return { orders: formattedOrders };
}
