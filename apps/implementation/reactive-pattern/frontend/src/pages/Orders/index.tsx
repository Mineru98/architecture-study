import React, { useEffect, useState } from 'react';
import { orderStream } from '../../streams/orderStream';
import { authStream } from '../../streams/authStream';
import { ORDER_STATUS_MAP } from '../../shared/constants';
import { Container, Stack, Heading, Text, Card, Badge } from '@vibe-architecture/react';

export default function Orders() {
  const [orderState, setOrderState] = useState(orderStream.getState());
  const [authState, setAuthState] = useState(authStream.getState());

  useEffect(() => {
    const s1 = orderStream.state$.subscribe(setOrderState);
    const s2 = authStream.state$.subscribe((s) => { if (s.user) orderStream.loadOrders(s.user.id); });
    if (authState.user) orderStream.loadOrders(authState.user.id);
    return () => { s1.unsubscribe(); s2.unsubscribe(); };
  }, []);

  return (
    <Container maxWidth="700px" style={{ margin: '20px auto' }}>
      <Heading level={2}>주문 내역</Heading>
      {orderState.orders.length === 0 ? <Text>주문 내역이 없습니다.</Text> : (
        orderState.orders.map((o: any) => (
          <Card key={o.id} style={{ marginBottom: 12 }}>
            <Stack direction="row" justify="space-between">
              <Text style={{ fontWeight: 'bold' }}>주문 {o.id}</Text>
              <Badge tone="neutral" size="sm">{ORDER_STATUS_MAP[o.status] || o.status}</Badge>
            </Stack>
            <div style={{ marginTop: 8 }}>
              {(o.items as any[]).map((item, i) => (
                <Text key={i} variant="muted" as="div">{item.name} x{item.quantity}</Text>
              ))}
            </div>
            <Text style={{ marginTop: 8, fontWeight: 700 }}>합계: {Number(o.total).toLocaleString()}원</Text>
          </Card>
        ))
      )}
    </Container>
  );
}
