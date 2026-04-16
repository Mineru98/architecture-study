import React from 'react';
import { Stack, Button, Heading, Text, Card, Divider } from '@vibe-architecture/react';
import { useCartStore } from '../../shared/store/cartStore';
import { useAuthStore } from '../../shared/store/authStore';
import apiClient from '../../shared/api/apiClient';

const Cart: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const checkout = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      onNavigate('/login');
      return;
    }
    try {
      await apiClient.post('/orders', {
        userId: user.id,
        items: items.map((i) => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity })),
      });
      clearCart();
      alert('주문이 완료되었습니다.');
      onNavigate('/orders');
    } catch (err) {
      alert('주문 실패');
    }
  };

  return (
    <div>
      <Heading level={2}>장바구니</Heading>
      {items.length === 0 ? (
        <div>
          <Text>장바구니가 비어있습니다.</Text>
          <Button variant="ghost" onClick={() => onNavigate('/')}>쇼핑 계속하기</Button>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <Card key={item.productId} style={{ marginBottom: '8px' }}>
              <Stack direction="row" align="center" gap="var(--va-space-16)">
                <div style={{ width: '60px', height: '60px', background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📦</div>
                <div style={{ flex: 1 }}>
                  <Heading level={4}>{item.name}</Heading>
                  <Text variant="muted">{item.price.toLocaleString()}원</Text>
                </div>
                <Stack direction="row" align="center" gap="var(--va-space-8)">
                  <Button variant="outline" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                  <Text>{item.quantity}</Text>
                  <Button variant="outline" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                </Stack>
                <Text style={{ width: '100px', textAlign: 'right', fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()}원</Text>
                <Button variant="ghost" onClick={() => removeItem(item.productId)} style={{ color: 'red' }}>삭제</Button>
              </Stack>
            </Card>
          ))}
          <Divider />
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <Heading level={3}>총 금액: {total.toLocaleString()}원</Heading>
            <Button variant="solid" onClick={checkout} style={{ marginTop: '8px', padding: '12px 32px', fontSize: '16px' }}>
              주문하기
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
