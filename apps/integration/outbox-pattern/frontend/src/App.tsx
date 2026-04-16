import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Stack, Button, Container } from '@vibe-architecture/react';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Stack direction="row" gap="var(--va-space-16)" align="center" style={{ padding: '12px 24px', background: '#1a1a2e', borderBottom: '1px solid var(--va-color-border-default)' }}>
        <Button variant="ghost" as={NavLink} to="/" end style={{ color: '#eee' }}>상품 목록</Button>
        <Button variant="ghost" as={NavLink} to="/cart" style={{ color: '#eee' }}>장바구니</Button>
        <Button variant="ghost" as={NavLink} to="/orders" style={{ color: '#eee' }}>주문 내역</Button>
        <Button variant="ghost" as={NavLink} to="/login" style={{ color: '#eee' }}>로그인</Button>
      </Stack>
      <Container maxWidth="72rem" padding="var(--va-space-16)" centered={true}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </HashRouter>
  );
};

export default App;
