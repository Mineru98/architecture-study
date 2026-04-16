import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeItem, updateQuantity, clearCart } from '../../store/slices/cartSlice';
import { createOrder } from '../../store/slices/orderSlice';
import { selectCartItems, selectCartTotal, selectUser } from '../../store/selectors';
import { Container, Stack, Button, Heading, Text, Divider } from '@vibe-architecture/react';

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);
  const user = useAppSelector(selectUser);
  const canCheckout = !!user && items.length > 0;

  const handleCheckout = () => {
    if (!user) return;
    dispatch(createOrder({ userId: user.id, items, total }));
    dispatch(clearCart());
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
                <Button variant="outline" onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity - 1 }))}>-</Button>
                <Text>{item.quantity}</Text>
                <Button variant="outline" onClick={() => dispatch(updateQuantity({ productId: item.productId, quantity: item.quantity + 1 }))}>+</Button>
                <Button variant="ghost" onClick={() => dispatch(removeItem(item.productId))} style={{ color: 'red' }}>삭제</Button>
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
