import React, { useState, useEffect } from 'react';
import { Stack, Heading, Text, Card, Badge } from '@vibe-architecture/react';
import { fetchOrders } from '../../entities/order/api';
import { useAuthStore } from '../../shared/store/authStore';
import { ORDER_STATUS } from '../../shared/constants';
export const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const { user, isAuthenticated } = useAuthStore();
  useEffect(() => { if (isAuthenticated && user) fetchOrders(user.id).then(setOrders); }, [isAuthenticated, user]);
  if (!isAuthenticated) return <Text>로그인이 필요합니다</Text>;
  return (
    <div><Heading level={2}>주문 내역</Heading>
      {orders.map(o => (
        <Card key={o.id} style={{ marginBottom: 12 }}>
          <Stack direction="row" justify="space-between"><Text style={{ fontWeight: 'bold' }}>{o.id}</Text><Badge tone="neutral" size="sm">{ORDER_STATUS[o.status] || o.status}</Badge></Stack>
          {o.items.map((i: any, idx: number) => <Text key={idx} as="div">{i.name} x{i.quantity}</Text>)}
          <div style={{ textAlign: 'right', fontWeight: 'bold', marginTop: 8 }}><Text style={{ fontWeight: 'bold' }}>합계: {Number(o.total).toLocaleString()}원</Text></div>
        </Card>
      ))}
    </div>
  );
};
