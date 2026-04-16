import React, { useState, useEffect } from 'react';
import { Container, Stack, Heading, Button, Badge, Divider } from '@vibe-architecture/react';
import { useAuthStore } from './shared/store/authStore';
import { useCartStore } from './shared/store/cartStore';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Admin from './pages/Admin';

const App: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash.slice(1) || '/');
  const { user, isAuthenticated, restore, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  useEffect(() => {
    restore();
    const handler = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
    setRoute(path);
  };

  const renderPage = () => {
    if (route.startsWith('/products/')) {
      return <ProductDetail productId={route.split('/')[2]} onNavigate={navigate} />;
    }
    switch (route) {
      case '/cart': return <Cart onNavigate={navigate} />;
      case '/orders': return <Orders />;
      case '/login': return <Login onNavigate={navigate} />;
      case '/admin': return <Admin />;
      default: return <ProductList onNavigate={navigate} />;
    }
  };

  return (
    <Container>
      <Stack direction="row" justify="space-between" align="center" style={{ padding: '16px 0', marginBottom: '24px' }}>
        <Heading level={1} style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>🛍️ 쇼핑몰</Heading>
        <Stack direction="row" gap="var(--va-space-16)" align="center">
          <Button variant="ghost" onClick={() => navigate('/')}>상품</Button>
          <Button variant="ghost" onClick={() => navigate('/cart')}>
            장바구니 {itemCount > 0 && <Badge tone="inverse" size="sm">{itemCount}</Badge>}
          </Button>
          <Button variant="ghost" onClick={() => navigate('/orders')}>주문내역</Button>
          {user?.role === 'admin' && <Button variant="ghost" onClick={() => navigate('/admin')}>관리자</Button>}
          {isAuthenticated ? (
            <span>{user?.name}님 <Button variant="ghost" onClick={logout}>로그아웃</Button></span>
          ) : (
            <Button variant="ghost" onClick={() => navigate('/login')}>로그인</Button>
          )}
        </Stack>
      </Stack>
      <Divider />
      <main>{renderPage()}</main>
    </Container>
  );
};

export default App;
