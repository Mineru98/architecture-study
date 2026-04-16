import React from 'react';
import { useCartViewModel } from '../../viewmodels/useCartViewModel';
import { Container, Stack, Button, Heading, Text, Divider } from '@vibe-architecture/react';

export default function Cart() {
  const vm = useCartViewModel();

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Heading level={2}>장바구니 ({vm.itemCount}개)</Heading>
      {vm.isEmpty ? <Text>장바구니가 비어있습니다.</Text> : (
        <>
          {vm.items.map((item) => (
            <Stack direction="row" justify="space-between" align="center" key={item.productId} style={{ padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <div>
                <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                <Text variant="muted">{(item.price * item.quantity).toLocaleString()}원</Text>
              </div>
              <Stack direction="row" align="center" gap="var(--va-space-8)">
                <Button variant="outline" onClick={() => vm.updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                <Text>{item.quantity}</Text>
                <Button variant="outline" onClick={() => vm.updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                <Button variant="ghost" onClick={() => vm.removeItem(item.productId)} style={{ color: 'red' }}>삭제</Button>
              </Stack>
            </Stack>
          ))}
          <div style={{ fontSize: 20, fontWeight: 700, marginTop: 16 }}>
            <Text style={{ fontWeight: 'bold' }}>합계: {vm.total.toLocaleString()}원</Text>
          </div>
          <Button variant="solid" onClick={vm.checkout} disabled={!vm.canCheckout} style={{ width: '100%', marginTop: 20, padding: 14, fontSize: 16 }}>
            {vm.canCheckout ? '주문하기' : '로그인 후 주문 가능'}
          </Button>
        </>
      )}
    </Container>
  );
}
