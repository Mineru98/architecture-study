import React from 'react';
import { useOrdersViewModel } from '../../viewmodels/useOrdersViewModel';
import { Container, Stack, Heading, Text, Card, Badge } from '@vibe-architecture/react';

export default function Orders() {
  const { orders, loading, statusMap } = useOrdersViewModel();

  if (loading) return <Container maxWidth="700px" style={{ margin: '20px auto' }}>로딩중...</Container>;

  return (
    <Container maxWidth="700px" style={{ margin: '20px auto' }}>
      <Heading level={2}>주문 내역</Heading>
      {orders.length === 0 ? <Text>주문 내역이 없습니다.</Text> : (
        orders.map((o: any) => (
          <Card key={o.id} style={{ marginBottom: 12 }}>
            <Stack direction="row" justify="space-between">
              <Text style={{ fontWeight: 'bold' }}>주문 {o.id}</Text>
              <Badge tone="neutral" size="sm">{statusMap[o.status] || o.status}</Badge>
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
