import React from 'react';
import { Stack, Button, Text } from '@vibe-architecture/react';
interface CartItemProps { item: any; onUpdateQty: (id: string, qty: number) => void; onRemove: (id: string) => void; }
export const CartItemMolecule: React.FC<CartItemProps> = ({ item, onUpdateQty, onRemove }) => (
  <Stack direction="row" justify="space-between" align="center" style={{ padding: 12, borderBottom: '1px solid #eee' }}>
    <div><Text style={{ fontWeight: 'bold' }}>{item.name}</Text> - <Text>{item.price.toLocaleString()}원</Text></div>
    <Stack direction="row" align="center" gap="var(--va-space-8)">
      <Button variant="outline" onClick={() => onUpdateQty(item.productId, item.quantity - 1)}>-</Button>
      <Text>{item.quantity}</Text>
      <Button variant="outline" onClick={() => onUpdateQty(item.productId, item.quantity + 1)}>+</Button>
      <Button variant="ghost" onClick={() => onRemove(item.productId)} style={{ color: 'red' }}>삭제</Button>
    </Stack>
  </Stack>
);
