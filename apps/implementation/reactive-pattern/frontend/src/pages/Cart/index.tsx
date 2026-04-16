import React, { useEffect, useState } from 'react';
import { cartStream } from '../../streams/cartStream';
import { orderStream } from '../../streams/orderStream';
import { authStream } from '../../streams/authStream';
import { Container, Stack, Button, Heading, Text, Divider } from '@vibe-architecture/react';

export default function Cart() {
  const [cartState, setCartState] = useState(cartStream.getState());
  const [authState, setAuthState] = useState(authStream.getState());

  useEffect(() => {
    const s1 = cartStream.state$.subscribe(setCartState);
    const s2 = authStream.state$.subscribe(setAuthState);
    return () => { s1.unsubscribe(); s2.unsubscribe(); };
  }, []);

  const total = cartState.items.reduce((s, i) => s + i.price * i.quantity, 0);
  const canCheckout = !!authState.user && cartState.items.length > 0;

  const handleCheckout = () => {
    if (!authState.user) return;
    orderStream.createOrder(authState.user.id, cartState.items, total);
    cartStream.clearCart();
  };

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Heading level={2}>장바구니</Heading>
      {cartState.items.length === 0 ? <Text>장바구니가 비어있습니다.</Text> : (
        <>
          {cartState.items.map((item) => (
            <Stack direction="row" justify="space-between" align="center" key={item.productId} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text variant="muted">{(item.price * item.quantity).toLocaleString()}원</Text>
              </div>
              <Stack direction="row" align="center" gap="var(--va-space-8)">
                <Button variant="outline" onClick={() => cartStream.updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                <Text>{item.quantity}</Text>
                <Button variant="outline" onClick={() => cartStream.updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                <Button variant="ghost" onClick={() => cartStream.removeItem(item.productId)} style={{ color: 'red' }}>삭제</Button>
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
