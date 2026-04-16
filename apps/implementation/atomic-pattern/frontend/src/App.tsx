import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAtom } from './atoms/core';
import { cartTotalAtom } from './atoms/cartAtoms';
import { userAtom, tokenAtom } from './atoms/authAtoms';
import { Stack, Button, Heading, Badge, Container } from '@vibe-architecture/react';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';

function Header() {
  const [cartTotal] = useAtom(cartTotalAtom);
  const [user] = useAtom(userAtom);
  const location = useLocation();

  const isActive = (path: string) => location.hash === `#${path}`;

  return (
    <Stack direction="row" align="center" gap="var(--va-space-16)" style={{ padding: '12px 24px', background: '#1a1a2e', borderBottom: '1px solid var(--va-color-border-default)' }}>
      <Link to="/" style={{ color: '#fff', fontSize: '18px', fontWeight: 700, textDecoration: 'none' }}>
        Atomic Mall
      </Link>
      <Stack direction="row" gap="var(--va-space-16)">
        <Button variant="ghost" as={Link} to="/" style={{ color: isActive('/') ? '#e94560' : '#eee' }}>상품 목록</Button>
        <Button variant="ghost" as={Link} to="/cart" style={{ color: isActive('/cart') ? '#e94560' : '#eee' }}>
          장바구니 {cartTotal.count > 0 && <Badge tone="neutral" size="sm">{cartTotal.count}</Badge>}
        </Button>
        <Button variant="ghost" as={Link} to="/orders" style={{ color: isActive('/orders') ? '#e94560' : '#eee' }}>주문 내역</Button>
      </Stack>
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <span style={{ color: '#eee', fontSize: '14px' }}>{user.name}님</span>
        ) : (
          <Button variant="ghost" as={Link} to="/login" style={{ color: isActive('/login') ? '#e94560' : '#eee' }}>로그인</Button>
        )}
      </div>
    </Stack>
  );
}

function AppContent() {
  const [, setToken] = useAtom(tokenAtom);
  const [, setUser] = useAtom(userAtom);

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (authData) {
      try {
        const { token, user } = JSON.parse(authData);
        if (token) setToken(token);
        if (user) setUser(user);
      } catch { /* ignore */ }
    }
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="72rem" padding="var(--va-space-16)" centered={true}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
