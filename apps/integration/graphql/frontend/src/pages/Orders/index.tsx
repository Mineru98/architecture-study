import React, { useEffect, useState } from 'react';
import { graphqlRequest, queries } from '../../shared/api/graphqlClient';
import { useAuthStore } from '../../shared/store/authStore';
import { ORDER_STATUS_MAP } from '../../shared/constants';
import { Stack, Card, Heading, Text, Badge } from '@vibe-architecture/react';
import type { Order, OrdersData } from './types';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const variables = user ? { userId: user.id } : {};
        const data = await graphqlRequest<OrdersData>(queries.orders, variables);
        setOrders(data.orders);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  if (loading) return <Text>주문 내역을 불러오는 중...</Text>;

  if (orders.length === 0) {
    return <div style={{ textAlign: 'center', padding: '40px' }}><Text>주문 내역이 없습니다.</Text></div>;
  }

  return (
    <div>
      <Heading level={2} style={{ marginBottom: '20px' }}>주문 내역</Heading>
      {orders.map((order) => (
        <Card key={order.id} style={{ marginBottom: '12px' }}>
          <Stack direction="row" justify="space-between" align="center">
            <Text style={{ fontWeight: 'bold' }}>주문번호: {order.id}</Text>
            <Badge tone="neutral" size="sm">{ORDER_STATUS_MAP[order.status] || order.status}</Badge>
          </Stack>
          <Text variant="muted" style={{ marginTop: '8px' }}>{new Date(order.createdAt).toLocaleString('ko-KR')}</Text>
          <Text style={{ color: '#e94560', fontWeight: 'bold', marginTop: '4px' }}>{Number(order.total).toLocaleString()}원</Text>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
