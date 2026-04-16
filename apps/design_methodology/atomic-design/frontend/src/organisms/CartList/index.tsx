import React from 'react';
import { CartItemMolecule } from '../../molecules/CartItem';
import { Button, Text } from '@vibe-architecture/react';
interface CartListProps { items: any[]; total: number; onUpdateQty: (id: string, qty: number) => void; onRemove: (id: string) => void; onOrder: () => void; }
export const CartList: React.FC<CartListProps> = ({ items, total, onUpdateQty, onRemove, onOrder }) => (
  <div>
    {items.length === 0 ? <Text>장바구니가 비어있습니다</Text> : (
      <>
        {items.map(item => <CartItemMolecule key={item.productId} item={item} onUpdateQty={onUpdateQty} onRemove={onRemove} />)}
        <div style={{ textAlign: 'right', marginTop: 16, fontSize: 20 }}><Text style={{ fontWeight: 'bold' }}>합계: {total.toLocaleString()}원</Text></div>
        <Button variant="solid" onClick={onOrder} style={{ width: '100%', marginTop: 16, padding: 16, fontSize: 18 }}>주문하기</Button>
      </>
    )}
  </div>
);
