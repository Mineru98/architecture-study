import React, { useState, useEffect } from 'react';
import { Container } from '@vibe-architecture/react';
import { useAuthStore } from './shared/store/authStore';
import { useCartStore } from './shared/store/cartStore';
import { Header } from './widgets/header';
import { HomePage } from './pages/home';
import { CartPage } from './pages/cart';
import { OrdersPage } from './pages/orders';
import { LoginPage } from './pages/login';

export default function App() {
  const [page, setPage] = useState('products');
  const { user, isAuthenticated, logout, restore } = useAuthStore();
  const cart = useCartStore();
  useEffect(() => { restore(); }, []);

  return (
    <Container>
      <Header cartCount={cart.items.length} user={user} onNavigate={setPage} onLogout={logout} />
      {page === 'products' && <HomePage />}
      {page === 'cart' && <CartPage />}
      {page === 'orders' && <OrdersPage />}
      {page === 'login' && <LoginPage onBack={() => setPage('products')} />}
    </Container>
  );
}
