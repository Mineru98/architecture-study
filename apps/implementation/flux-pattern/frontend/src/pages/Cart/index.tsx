import React, { useEffect, useState } from 'react';
import { CartStore } from '../../stores/cartStore';
import { CartActions } from '../../actions/cartActions';
import { OrderActions } from '../../actions/orderActions';
import { AuthStore } from '../../stores/authStore';
import { Container, Stack, Button, Heading, Text, Divider } from '@vibe-architecture/react';

export default function Cart() {
  const [items, setItems] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsub1 = CartStore.subscribe(() => setItems([...CartStore.getItems()]));
    const unsub2 = AuthStore.subscribe(() => setUser(AuthStore.getUser()));
    setItems([...CartStore.getItems()]);
    setUser(AuthStore.getUser());
    return () => { unsub1(); unsub2(); };
  }, []);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const canCheckout = !!user && items.length > 0;

  const handleCheckout = () => {
    if (!user) return;
    OrderActions.createOrder(user.id, items, total);
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
                <Button variant="outline" onClick={() => CartActions.updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                <Text>{item.quantity}</Text>
                <Button variant="outline" onClick={() => CartActions.updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                <Button variant="ghost" onClick={() => CartActions.removeItem(item.productId)} style={{ color: 'red' }}>삭제</Button>
              </Stack>
            </Stack>
          ))}
          <div style={{ fontSize: 20, fontWeight: 700, marginTop: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>합계: {total.toLocaleString()}원</Text>
          </div>
          <Button variant="solid" onClick={handleCheckout} disabled={!canCheckout} style={{ width: '100%', marginTop: 20, padding: 14, fontSize: 16 }}>
            {canCheckout ? '주문하기' : '로그인 후 주문 가능'}
          </Button>
        </>
      )}
    </Container>
  );
}
