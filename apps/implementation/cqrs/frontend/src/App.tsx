import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Stack, Button, Divider, Container } from '@vibe-architecture/react';
import { useAuthStore } from './shared/store/authStore';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';

export default function App() {
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage);
  React.useEffect(() => { loadFromStorage(); }, [loadFromStorage]);

  return (
    <BrowserRouter>
      <Stack direction="row" gap="var(--va-space-16)" style={{ padding: '16px', borderBottom: '1px solid var(--va-color-border-default)' }}>
        <Button variant="ghost" onClick={() => window.location.href = '/'}>상품</Button>
        <Button variant="ghost" onClick={() => window.location.href = '/cart'}>장바구니</Button>
        <Button variant="ghost" onClick={() => window.location.href = '/orders'}>주문</Button>
        <Button variant="ghost" onClick={() => window.location.href = '/login'}>로그인</Button>
      </Stack>
      <Container>
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
