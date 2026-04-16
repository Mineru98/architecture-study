import React from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from '../../atoms/core';
import { cartItemsAtom, cartTotalAtom, useCartActions } from '../../atoms/cartAtoms';
import { tokenAtom } from '../../atoms/authAtoms';
import { Stack, Button, Heading, Text, Badge, Divider } from '@vibe-architecture/react';

export default function Cart() {
  const [items] = useAtom(cartItemsAtom);
  const [cartTotal] = useAtom(cartTotalAtom);
  const { updateQuantity, removeFromCart, clearCart } = useCartActions();
  const [token] = useAtom(tokenAtom);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <Heading level={2}>장바구니가 비어있습니다</Heading>
        <Button variant="outline" as={Link} to="/" style={{ marginTop: '16px' }}>쇼핑 계속하기 →</Button>
      </div>
    );
  }

  const handleOrder = async () => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })) }),
      });
      alert('주문이 완료되었습니다.');
      clearCart();
    } catch {
      alert('주문에 실패했습니다.');
    }
  };

  return (
    <div>
      <Stack direction="row" justify="space-between" align="center" style={{ marginBottom: '20px' }}>
        <Heading level={2}>장바구니</Heading>
        <Button variant="outline" onClick={clearCart}>전체 삭제</Button>
      </Stack>
      {items.map((item) => (
        <Stack direction="row" align="center" justify="space-between" key={item.productId} style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>
          <div style={{ flex: 1 }}>
            <Text style={{ fontWeight: 600 }}>{item.name}</Text>
            <Text variant="muted" style={{ marginTop: '4px' }}>{item.price.toLocaleString()}원</Text>
          </div>
          <Stack direction="row" align="center" gap="var(--va-space-8)">
            <Button variant="outline" onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</Button>
            <Text>{item.quantity}</Text>
            <Button variant="outline" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</Button>
          </Stack>
          <Text style={{ width: '100px', textAlign: 'right', fontWeight: 600 }}>{(item.price * item.quantity).toLocaleString()}원</Text>
          <Button variant="ghost" onClick={() => removeFromCart(item.productId)} style={{ marginLeft: '16px', color: '#e94560' }}>삭제</Button>
        </Stack>
      ))}
      <div style={{ marginTop: '20px', padding: '16px', background: '#f9f9f9', borderRadius: '8px' }}>
        <Stack direction="row" justify="space-between">
          <Text>총 수량</Text>
          <Text>{cartTotal.count}개</Text>
        </Stack>
        <Stack direction="row" justify="space-between" style={{ fontSize: '18px', fontWeight: 700, marginTop: '12px' }}>
          <Text style={{ fontWeight: 700 }}>합계</Text>
          <Text style={{ fontWeight: 700 }}>{cartTotal.total.toLocaleString()}원</Text>
        </Stack>
      </div>
      <Button variant="solid" onClick={handleOrder} style={{ width: '100%', marginTop: '16px', padding: '14px', fontSize: '16px' }}>
        주문하기
      </Button>
    </div>
  );
}
