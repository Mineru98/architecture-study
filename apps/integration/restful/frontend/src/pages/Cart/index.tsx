import React from 'react';
import { useCartStore } from '../../shared/store/cartStore';
import { useAuthStore } from '../../shared/store/authStore';
import apiClient from '../../shared/api/apiClient';
import { Container, Stack, Button, Heading, Text, Divider } from '@vibe-architecture/react';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);

  const checkout = async () => {
    if (!user) return;
    await apiClient.post('/orders', { userId: user.id, items, total: getTotal() });
    clearCart();
    alert('주문이 완료되었습니다.');
  };

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Heading level={2}>장바구니</Heading>
      {items.length === 0 ? <Text>장바구니가 비어있습니다.</Text> : (
        <>
          {items.map((item) => (
            <Stack direction="row" justify="space-between" align="center" key={item.productId} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text variant="muted">{(item.price * item.quantity).toLocaleString()}원</Text>
              </div>
              <Stack direction="row" align="center" gap="var(--va-space-8)">
                <Button variant="outline" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                <Text>{item.quantity}</Text>
                <Button variant="outline" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                <Button variant="ghost" onClick={() => removeItem(item.productId)} style={{ color: 'red' }}>삭제</Button>
              </Stack>
            </Stack>
          ))}
          <div style={{ fontSize: 20, fontWeight: 700, marginTop: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>합계: {getTotal().toLocaleString()}원</Text>
          </div>
          <Button variant="solid" onClick={checkout} disabled={!user} style={{ width: '100%', marginTop: 20, padding: 14, fontSize: 16 }}>
            {user ? '주문하기' : '로그인 후 주문 가능'}
          </Button>
        </>
      )}
    </Container>
  );
}
