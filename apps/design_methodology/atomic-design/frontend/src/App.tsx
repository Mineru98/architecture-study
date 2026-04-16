import React, { useState, useEffect } from 'react';
import { Stack, Heading, Card, Text, Badge, Button, Input, FormField, Container } from '@vibe-architecture/react';
import { useAuthStore } from './shared/store/authStore';
import { useCartStore } from './shared/store/cartStore';
import apiClient from './shared/api/apiClient';
import { CATEGORIES, ORDER_STATUS, API_ROUTES } from './shared/constants';
import { ShopLayout } from './templates/ShopLayout';
import { ProductGrid } from './organisms/ProductGrid';
import { CartList } from './organisms/CartList';

export default function App() {
  const [page, setPage] = useState('products');
  const { user, isAuthenticated, login, logout, restore } = useAuthStore();
  const cart = useCartStore();
  useEffect(() => { restore(); }, []);

  const handleAddToCart = (p: any) => cart.addItem({ productId: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl });
  const handleOrder = async () => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (!auth.user) { alert('로그인 필요'); return; }
    await apiClient.post(API_ROUTES.ORDERS, { userId: auth.user.id, items: cart.items });
    cart.clearCart(); alert('주문 완료');
  };

  return (
    <ShopLayout cartCount={cart.items.length} user={user} onNavigate={setPage} onLogout={logout}>
      {page === 'products' && <ProductListPage onAddToCart={handleAddToCart} />}
      {page === 'cart' && <CartList items={cart.items} total={cart.getTotal()} onUpdateQty={cart.updateQuantity} onRemove={cart.removeItem} onOrder={handleOrder} />}
      {page === 'orders' && <OrdersPage />}
      {page === 'login' && <LoginPage onLogin={login} onBack={() => setPage('products')} />}
    </ShopLayout>
  );
}

function ProductListPage({ onAddToCart }: { onAddToCart: (p: any) => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('전체');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    apiClient.get(API_ROUTES.PRODUCTS, { params: { category, page } }).then(res => { setProducts(res.data.items); setTotal(res.data.total); });
  }, [category, page]);
  return (
    <div>
      <Stack direction="row" gap="var(--va-space-8)" style={{ marginBottom: 16 }}>
        {CATEGORIES.map(c => <Button key={c} variant={category === c ? 'solid' : 'outline'} onClick={() => { setCategory(c); setPage(1); }}>{c}</Button>)}
      </Stack>
      <ProductGrid products={products} onSelect={() => {}} onAddToCart={onAddToCart} />
      <Stack direction="row" justify="center" gap="var(--va-space-8)" style={{ marginTop: 20 }}>
        {Array.from({ length: Math.ceil(total / 10) }, (_, i) => <Button key={i+1} variant={page === i+1 ? 'solid' : 'ghost'} onClick={() => setPage(i+1)}>{i+1}</Button>)}
      </Stack>
    </div>
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const { user, isAuthenticated } = useAuthStore();
  useEffect(() => { if (isAuthenticated && user) apiClient.get(API_ROUTES.ORDERS, { params: { userId: user.id } }).then(res => setOrders(res.data)); }, [isAuthenticated, user]);
  if (!isAuthenticated) return <Text>로그인이 필요합니다</Text>;
  return (
    <div>
      <Heading level={2}>주문 내역</Heading>
      {orders.map(o => (
        <Card key={o.id} style={{ marginBottom: 12 }}>
          <Stack direction="row" justify="space-between"><Text style={{ fontWeight: 'bold' }}>{o.id}</Text><Badge tone="neutral" size="sm">{ORDER_STATUS[o.status] || o.status}</Badge></Stack>
          {o.items.map((i: any, idx: number) => <Text key={idx} as="div">{i.name} x{i.quantity}</Text>)}
        </Card>
      ))}
    </div>
  );
}

function LoginPage({ onLogin, onBack }: { onLogin: (user: any, token: string) => void; onBack: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { const res = await apiClient.post(API_ROUTES.AUTH_LOGIN, { email, password }); onLogin(res.data.user, res.data.token); onBack(); } catch { alert('로그인 실패'); }
  };
  return (
    <Container maxWidth="400px" style={{ margin: '100px auto' }}>
      <Heading level={2}>로그인</Heading>
      <form onSubmit={handleSubmit}>
        <FormField label="이메일" fieldId="email"><Input id="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: 8 }} /></FormField>
        <FormField label="비밀번호" fieldId="password"><Input id="password" placeholder="비밀번호" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginBottom: 8 }} /></FormField>
        <Button type="submit" variant="solid" style={{ width: '100%', padding: 12 }}>로그인</Button>
      </form>
      <Text variant="caption" style={{ marginTop: 16 }}>테스트: customer@test.com / 1234</Text>
    </Container>
  );
}
