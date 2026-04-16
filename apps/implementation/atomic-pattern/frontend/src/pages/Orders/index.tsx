import React, { useEffect } from 'react';
import { useAtom } from '../../atoms/core';
import { ordersAtom, orderLoadingAtom } from '../../atoms/orderAtoms';
import { tokenAtom } from '../../atoms/authAtoms';
import apiClient from '../../shared/api/apiClient';
import { ORDER_STATUS_MAP } from '../../shared/constants';
import { Stack, Heading, Text, Card, Badge } from '@vibe-architecture/react';

export default function Orders() {
  const [orders, setOrders] = useAtom(ordersAtom);
  const [loading, setLoading] = useAtom(orderLoadingAtom);
  const [token] = useAtom(tokenAtom);

  useEffect(() => {
    if (!token) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get('/orders');
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (!token) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Heading level={2}>로그인이 필요합니다</Heading>
        <Text variant="muted">주문 내역을 보려면 로그인해주세요.</Text>
      </div>
    );
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</div>;

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Heading level={2}>주문 내역이 없습니다</Heading>
      </div>
    );
  }

  return (
    <div>
      <Heading level={2} style={{ marginBottom: '20px' }}>주문 내역</Heading>
      {orders.map((order) => (
        <Card key={order.id} style={{ marginBottom: '16px' }}>
          <Stack direction="row" justify="space-between" style={{ marginBottom: '12px' }}>
            <div>
              <Text style={{ fontWeight: 600 }}>주문번호: {order.id.slice(0, 8)}</Text>
              <Text variant="caption" style={{ marginLeft: '12px' }}>
                {new Date(order.createdAt).toLocaleDateString()}
              </Text>
            </div>
            <Badge tone="neutral" size="sm">{ORDER_STATUS_MAP[order.status] || order.status}</Badge>
          </Stack>
          <div style={{ fontSize: '14px', color: '#555' }}>
            {(order.items as Array<{ name: string; quantity: number }>).map((item, i) => (
              <Text key={i} variant="muted" as="div" style={{ padding: '4px 0' }}>{item.name} x {item.quantity}</Text>
            ))}
          </div>
          <Text style={{ textAlign: 'right', fontWeight: 700, marginTop: '8px', fontSize: '16px' }}>
            {Number(order.total).toLocaleString()}원
          </Text>
        </Card>
      ))}
    </div>
  );
}
