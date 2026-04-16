import React from 'react';
import { useOrdersPresenter } from '../../presenters/useOrdersPresenter';
import { Container, Stack, Heading, Text, Card, Badge } from '@vibe-architecture/react';

export default function Orders() {
  const { orders } = useOrdersPresenter();

  return (
    <Container maxWidth="700px" style={{ margin: '20px auto' }}>
      <Heading level={2}>주문 내역</Heading>
      {orders.length === 0 ? <Text>주문 내역이 없습니다.</Text> : (
        orders.map((o: any) => (
          <Card key={o.id} style={{ marginBottom: 12 }}>
            <Stack direction="row" justify="space-between">
              <Text style={{ fontWeight: 'bold' }}>주문 {o.id}</Text>
              <Badge tone="neutral" size="sm">{o.statusLabel}</Badge>
            </Stack>
            <Text variant="muted" as="div" style={{ marginTop: 8 }}>{o.itemSummary}</Text>
            <Text style={{ marginTop: 8, fontWeight: 700 }}>합계: {o.totalLabel}</Text>
          </Card>
        ))
      )}
    </Container>
  );
}
