import React from 'react';
import { Stack, Button, Heading, Text, Divider } from '@vibe-architecture/react';
import { useCartStore } from '../../shared/store/cartStore';
import { useCheckout } from '../../features/checkout/model';
export const CartPage = () => {
  const cart = useCartStore();
  const checkout = useCheckout();
  const handleOrder = async () => { try { await checkout(); alert('주문 완료'); } catch { alert('로그인이 필요합니다'); } };
  return (
    <div><Heading level={2}>장바구니</Heading>
      {cart.items.length === 0 ? <Text>장바구니가 비어있습니다</Text> : (
        <>
          {cart.items.map((item: any) => (
            <Stack direction="row" justify="space-between" align="center" key={item.productId} style={{ padding: 12, borderBottom: '1px solid #eee' }}>
              <div><Text style={{ fontWeight: 'bold' }}>{item.name}</Text> - {item.price.toLocaleString()}원</div>
              <Stack direction="row" align="center" gap="var(--va-space-8)">
                <Button variant="outline" onClick={() => cart.updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                <Text>{item.quantity}</Text>
                <Button variant="outline" onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                <Button variant="ghost" onClick={() => cart.removeItem(item.productId)}>삭제</Button>
              </Stack>
            </Stack>
          ))}
          <div style={{ textAlign: 'right', fontWeight: 'bold', marginTop: 16 }}><Text style={{ fontWeight: 'bold' }}>합계: {cart.getTotal().toLocaleString()}원</Text></div>
          <Button variant="solid" onClick={handleOrder} style={{ width: '100%', padding: 16, marginTop: 16 }}>주문하기</Button>
        </>
      )}
    </div>
  );
};
