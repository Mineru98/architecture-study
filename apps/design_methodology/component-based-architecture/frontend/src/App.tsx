import React, { useState, useEffect } from 'react';
import { Container, Stack, Heading, Button, Card, Input, FormField, Text, Badge, Divider } from '@vibe-architecture/react';
import { useAuthStore } from './shared/store/authStore';
import { useCartStore } from './shared/store/cartStore';
import apiClient from './shared/api/apiClient';
import { CATEGORIES, API_ROUTES, ORDER_STATUS } from './shared/constants';
import { Header } from './organisms/Header';
import { SearchBar } from './molecules/SearchBar';
import { ProductList } from './organisms/ProductList';

export default function App() {
  const [page, setPage] = useState('products');
  const { user, isAuthenticated, login, logout, restore } = useAuthStore();
  const cart = useCartStore();
  useEffect(() => { restore(); }, []);

  return (
    <Container>
      <Header cartCount={cart.items.length} user={user} onNavigate={setPage} onLogout={logout} />
      {page === 'products' && <ProductsPage onAddToCart={(p) => cart.addItem({ productId: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl })} />}
      {page === 'cart' && <CartPage />}
      {page === 'orders' && <OrdersPage />}
      {page === 'login' && <LoginPage onLogin={login} onBack={() => setPage('products')} />}
    </Container>
  );
}

function ProductsPage({ onAddToCart }: { onAddToCart: (p: any) => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('전체');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    apiClient.get(API_ROUTES.PRODUCTS, { params: { category, page } }).then(res => { setProducts(res.data.items); setTotal(res.data.total); });
  }, [category, page]);
  return (
    <div>
      <SearchBar value="" onChange={() => {}} categories={CATEGORIES} selected={category} onSelect={c => { setCategory(c); setPage(1); }} />
      <ProductList products={products} onAddToCart={onAddToCart} />
      <Stack direction="row" justify="center" gap="var(--va-space-8)" style={{ marginTop: 20 }}>
        {Array.from({ length: Math.ceil(total / 10) }, (_, i) => <Button key={i+1} variant={page === i+1 ? 'solid' : 'ghost'} onClick={() => setPage(i+1)}>{i+1}</Button>)}
      </Stack>
    </div>
  );
}

function CartPage() {
  const cart = useCartStore();
  const handleOrder = async () => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    if (!auth.user) { alert('로그인 필요'); return; }
    await apiClient.post(API_ROUTES.ORDERS, { userId: auth.user.id, items: cart.items });
    cart.clearCart(); alert('주문 완료');
  };
  return (
    <div>
      <Heading level={2}>장바구니</Heading>
      {cart.items.map((item: any) => (
        <Card key={item.productId} style={{ marginBottom: 8 }}>
          <Stack direction="row" justify="space-between" align="center">
            <div><Text style={{ fontWeight: 'bold' }}>{item.name}</Text> - {item.price.toLocaleString()}원 x {item.quantity}</div>
            <Stack direction="row" align="center" gap="var(--va-space-8)">
              <Button variant="outline" onClick={() => cart.updateQuantity(item.productId, item.quantity - 1)}>-</Button>
              <Text>{item.quantity}</Text>
              <Button variant="outline" onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}>+</Button>
              <Button variant="ghost" onClick={() => cart.removeItem(item.productId)}>삭제</Button>
            </Stack>
          </Stack>
        </Card>
      ))}
      {cart.items.length > 0 && <><div style={{ textAlign: 'right', fontWeight: 'bold' }}><Text style={{ fontWeight: 'bold' }}>합계: {cart.getTotal().toLocaleString()}원</Text></div><Button variant="solid" style={{ width: '100%', padding: 16, marginTop: 16 }} onClick={handleOrder}>주문하기</Button></>}
    </div>
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const { user, isAuthenticated } = useAuthStore();
  useEffect(() => { if (isAuthenticated && user) apiClient.get(API_ROUTES.ORDERS, { params: { userId: user.id } }).then(res => setOrders(res.data)); }, [isAuthenticated, user]);
  if (!isAuthenticated) return <Text>로그인이 필요합니다</Text>;
  return <div><Heading level={2}>주문 내역</Heading>{orders.map(o => <Card key={o.id} style={{ marginBottom: 12 }}><Text style={{ fontWeight: 'bold' }}>{o.id}</Text> - <Badge tone="neutral" size="sm">{ORDER_STATUS[o.status] || o.status}</Badge><div>{o.items.map((i: any, idx: number) => <Text key={idx} as="div">{i.name} x{i.quantity}</Text>)}</div></Card>)}</div>;
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
