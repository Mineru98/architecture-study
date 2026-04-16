import React from 'react';
import { useCartStore } from '../../shared/store/cartStore';
import { useAuthStore } from '../../shared/store/authStore';
import { graphqlRequest, mutations } from '../../shared/api/graphqlClient';
import { Container, Stack, Button, Heading, Text } from '@vibe-architecture/react';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const user = useAuthStore((s) => s.user);
  const [ordering, setOrdering] = React.useState(false);

  const handleOrder = async () => {
    if (!user) {
      alert('주문하려면 로그인해주세요.');
      return;
    }
    setOrdering(true);
    try {
      const orderItems = items.map((item) => JSON.stringify({ id: item.id, name: item.name, price: item.price, quantity: item.quantity }));
      await graphqlRequest(mutations.createOrder, { userId: user.id, items: orderItems, total: total() });
      alert('주문이 완료되었습니다.');
      clearCart();
    } catch (err: any) {
      alert(`주문 실패: ${err.message}`);
    } finally {
      setOrdering(false);
    }
  };

  if (items.length === 0) {
    return <div style={{ textAlign: 'center', padding: '40px' }}><Text>장바구니가 비어있습니다.</Text></div>;
  }

  return (
    <div>
      <Heading level={2} style={{ marginBottom: '20px' }}>장바구니</Heading>
      {items.map((item) => (
        <Stack direction="row" justify="space-between" align="center" key={item.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
          <Text>{item.name}</Text>
          <Text>{item.price.toLocaleString()}원</Text>
          <Stack direction="row" align="center" gap="var(--va-space-8)">
            <Button variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
            <Text>{item.quantity}</Text>
            <Button variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
          </Stack>
          <Text>{(item.price * item.quantity).toLocaleString()}원</Text>
          <Button variant="ghost" onClick={() => removeItem(item.id)} style={{ color: 'red' }}>삭제</Button>
        </Stack>
      ))}
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Heading level={3}>총합: {total().toLocaleString()}원</Heading>
        <Button variant="solid" onClick={handleOrder} disabled={ordering} style={{ marginTop: '12px', padding: '10px 24px', fontSize: '16px' }}>
          {ordering ? '주문 중...' : '주문하기'}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
