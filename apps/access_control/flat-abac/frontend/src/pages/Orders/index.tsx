import React, { useState, useEffect } from 'react';
import { Stack, Heading, Text, Card, Badge, Divider } from '@vibe-architecture/react';
import apiClient from '../../shared/api/apiClient';
import { useAuthStore } from '../../shared/store/authStore';
import { ORDER_STATUS } from '../../shared/constants';
import { Order } from './types';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (user) {
      apiClient.get('/orders', { params: { userId: user.id } }).then((res) => setOrders(res.data));
    }
  }, [user]);

  if (!user) return <Text>로그인이 필요합니다.</Text>;

  const statusTone: Record<string, 'neutral' | 'inverse' | 'subtle'> = {
    pending: 'neutral', paid: 'inverse', shipped: 'inverse', delivered: 'inverse', cancelled: 'neutral',
  };

  return (
    <div>
      <Heading level={2}>주문 내역</Heading>
      {orders.length === 0 ? <Text>주문 내역이 없습니다.</Text> : (
        orders.map((o) => (
          <Card key={o.id} style={{ marginBottom: '12px' }}>
            <Stack direction="row" justify="space-between" style={{ marginBottom: '8px' }}>
              <Text style={{ fontWeight: 'bold' }}>주문번호: {o.id.slice(0, 8)}</Text>
              <Badge tone={statusTone[o.status] || 'neutral'} size="sm">
                {ORDER_STATUS[o.status] || o.status}
              </Badge>
            </Stack>
            {o.items.map((item, i) => (
              <Stack direction="row" justify="space-between" key={i} style={{ padding: '4px 0' }}>
                <Text>{item.name} x{item.quantity}</Text>
                <Text>{(item.price * item.quantity).toLocaleString()}원</Text>
              </Stack>
            ))}
            <Divider />
            <div style={{ textAlign: 'right', paddingTop: '8px', marginTop: '8px' }}>
              <Text style={{ fontWeight: 'bold' }}>총액: {Number(o.total).toLocaleString()}원</Text>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default Orders;
