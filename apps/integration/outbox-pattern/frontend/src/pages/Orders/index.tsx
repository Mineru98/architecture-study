import React, { useEffect, useState } from 'react';
import apiClient from '../../shared/api/apiClient';
import { useAuthStore } from '../../shared/store/authStore';
import { ORDER_STATUS_MAP } from '../../shared/constants';
import { Container, Stack, Button, Heading, Text, Card, Badge } from '@vibe-architecture/react';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [outboxStatus, setOutboxStatus] = useState<any>(null);
  const user = useAuthStore((s) => s.user);

  const fetchData = async () => {
    if (user) {
      const ordersRes = await apiClient.get('/orders', { data: { userId: user.id } });
      setOrders(ordersRes.data.data);
    }
    const outboxRes = await apiClient.get('/outbox/status');
    setOutboxStatus(outboxRes.data.data);
  };

  useEffect(() => { fetchData(); }, [user]);

  return (
    <Container maxWidth="700px" style={{ margin: '20px auto' }}>
      <Heading level={2}>주문 내역 (Outbox Pattern)</Heading>

      {outboxStatus && (
        <Card style={{ background: '#ede7f6', border: '1px solid #b39ddb', marginBottom: 20 }}>
          <Stack direction="row" justify="space-between" align="center" style={{ marginBottom: 8 }}>
            <Heading level={3}>Outbox 상태</Heading>
            <Stack direction="row" gap="var(--va-space-8)">
              <Button variant="outline" onClick={fetchData} style={{ fontSize: 12 }}>새로고침</Button>
              <Button variant="solid" onClick={async () => { await apiClient.post('/outbox/process'); fetchData(); }} style={{ fontSize: 12 }}>수동 처리</Button>
            </Stack>
          </Stack>
          <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
            <div style={{ background: '#e1bee7', padding: '8px 16px', borderRadius: 8, textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{outboxStatus.stats.pending}</div><div>대기</div>
            </div>
            <div style={{ background: '#c8e6c9', padding: '8px 16px', borderRadius: 8, textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{outboxStatus.stats.processed}</div><div>완료</div>
            </div>
            <div style={{ background: '#ffcdd2', padding: '8px 16px', borderRadius: 8, textAlign: 'center', minWidth: 80 }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{outboxStatus.stats.failed}</div><div>실패</div>
            </div>
          </div>
          <Heading level={4} style={{ margin: '8px 0 4px' }}>최근 Outbox 메시지</Heading>
          {outboxStatus.recentMessages.length === 0 ? (
            <Text variant="muted">Outbox 메시지가 없습니다.</Text>
          ) : (
            outboxStatus.recentMessages.map((msg: any) => (
              <div key={msg.id} style={{ padding: '8px 12px', margin: '4px 0', borderRadius: 4, fontSize: 13, background: msg.status === 'processed' ? '#c8e6c9' : msg.status === 'failed' ? '#ffcdd2' : msg.status === 'processing' ? '#fff9c4' : '#e1bee7' }}>
                <strong>{msg.eventType}</strong> | {msg.aggregateType}/{msg.aggregateId.slice(0, 8)}... | {msg.status}
                <Text variant="caption"> | {new Date(msg.createdAt).toLocaleTimeString()}</Text>
                {msg.processedAt && <Text variant="caption" style={{ color: '#4caf50' }}> → {new Date(msg.processedAt).toLocaleTimeString()}</Text>}
              </div>
            ))
          )}
        </Card>
      )}

      {!user ? <Text>로그인이 필요합니다.</Text> : orders.length === 0 ? <Text>주문 내역이 없습니다.</Text> : (
        orders.map((o) => (
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
