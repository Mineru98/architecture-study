import { useState, useEffect, useCallback } from 'react';
import { orderModel } from '../models/productModel';
import { useAuthStore } from '../shared/store/authStore';
import { ORDER_STATUS_MAP } from '../shared/constants';

export function useOrdersViewModel() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);

  const load = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    const data = await orderModel.fetchOrders(user.id);
    setOrders(data);
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  return { orders, loading, statusMap: ORDER_STATUS_MAP };
}
