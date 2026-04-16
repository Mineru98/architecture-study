import React from 'react';
import { Stack, Heading, Button, Badge, Text } from '@vibe-architecture/react';
interface HeaderProps { cartCount: number; user: any; onNavigate: (p: string) => void; onLogout: () => void; }
export const Header: React.FC<HeaderProps> = ({ cartCount, user, onNavigate, onLogout }) => (
  <Stack direction="row" justify="space-between" align="center" style={{ marginBottom: 20, paddingBottom: 16 }}>
    <Heading level={1}>Shopping Mall</Heading>
    <Stack direction="row" gap="var(--va-space-12)" align="center">
      <Button variant="ghost" onClick={() => onNavigate('products')}>상품</Button>
      <Button variant="ghost" onClick={() => onNavigate('cart')}>장바구니 <Badge tone="inverse" size="sm">{cartCount}</Badge></Button>
      <Button variant="ghost" onClick={() => onNavigate('orders')}>주문</Button>
      {user ? <><Text>{user.name}</Text><Button variant="ghost" onClick={onLogout}>로그아웃</Button></> : <Button variant="solid" onClick={() => onNavigate('login')}>로그인</Button>}
    </Stack>
  </Stack>
);
