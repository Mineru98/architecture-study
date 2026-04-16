import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { AuthActions } from './actions/authActions';
import { Stack, Button, Container } from '@vibe-architecture/react';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';

export default function App() {
  useEffect(() => { AuthActions.restoreSession(); }, []);

  return (
    <BrowserRouter>
      <Stack direction="row" gap="var(--va-space-8)" style={{ padding: '16px', borderBottom: '1px solid var(--va-color-border-default)' }}>
        <Button variant="ghost" as={NavLink} to="/" end>상품</Button>
        <Button variant="ghost" as={NavLink} to="/cart">장바구니</Button>
        <Button variant="ghost" as={NavLink} to="/orders">주문</Button>
        <Button variant="ghost" as={NavLink} to="/login">로그인</Button>
      </Stack>
      <Container maxWidth="72rem" padding="var(--va-space-16)" centered={true}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
