import React, { useState, useEffect } from 'react';
import { Container, Stack, Heading, Button, Card, Input, FormField, Text, Badge, Divider } from '@vibe-architecture/react';
import { useAuthStore } from './shared/store/authStore';
import { useCartStore } from './shared/store/cartStore';
import apiClient from './shared/api/apiClient';
import { CATEGORIES, ORDER_STATUS, API_ROUTES } from './shared/constants';

export default function App() {
  const [page, setPage] = useState<'products' | 'cart' | 'orders' | 'login'>('products');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const { user, isAuthenticated, login, logout, restore } = useAuthStore();
  const cart = useCartStore();

  useEffect(() => { restore(); }, []);

  if (selectedProduct) return <ProductDetail id={selectedProduct} onBack={() => setSelectedProduct(null)} cart={cart} />;
  if (page === 'login') return <LoginPage onBack={() => setPage('products')} onLogin={login} />;
  if (page === 'cart') return <CartPage cart={cart} />;
  if (page === 'orders') return <OrdersPage />;

  return (
    <Container>
      <Stack direction="row" justify="space-between" align="center" style={{ marginBottom: 20, paddingBottom: 16 }}>
        <Heading level={1}>Shopping Mall</Heading>
        <Stack direction="row" gap="var(--va-space-12)" align="center">
          <Button variant="ghost" onClick={() => setPage('products')}>상품</Button>
          <Button variant="ghost" onClick={() => setPage('cart')}>장바구니 ({cart.items.length})</Button>
          <Button variant="ghost" onClick={() => setPage('orders')}>주문</Button>
          {isAuthenticated ? (
            <><Text>{user?.name}</Text><Button variant="ghost" onClick={logout}>로그아웃</Button></>
          ) : (
            <Button variant="ghost" onClick={() => setPage('login')}>로그인</Button>
          )}
        </Stack>
      </Stack>
      <Divider />
      <ProductList onSelect={setSelectedProduct} cart={cart} />
    </Container>
  );
}

function ProductList({ onSelect, cart }: { onSelect: (id: string) => void; cart: any }) {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('전체');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    apiClient.get(API_ROUTES.PRODUCTS, { params: { category, page } }).then(res => {
      setProducts(res.data.items);
      setTotal(res.data.total);
    });
  }, [category, page]);

  return (
    <div>
      <Stack direction="row" gap="var(--va-space-8)" style={{ marginBottom: 16 }}>
        {CATEGORIES.map(c => (
          <Button key={c} variant={category === c ? 'solid' : 'outline'} onClick={() => { setCategory(c); setPage(1); }}>{c}</Button>
        ))}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {products.map(p => (
          <Card key={p.id} style={{ cursor: 'pointer' }} onClick={() => onSelect(p.id)}>
            <div style={{ height: 120, background: '#f0f0f0', borderRadius: 4, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>상품 이미지</div>
            <Heading level={4}>{p.name}</Heading>
            <Text variant="caption">{p.category}</Text>
            <Text style={{ fontWeight: 'bold', margin: '4px 0' }}>{p.price.toLocaleString()}원</Text>
            <Button variant="solid" style={{ width: '100%', marginTop: 8 }} onClick={(e) => { e.stopPropagation(); cart.addItem({ productId: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl }); }}>장바구니 담기</Button>
          </Card>
        ))}
      </div>
      <Stack direction="row" justify="center" gap="var(--va-space-8)" style={{ marginTop: 20 }}>
        {Array.from({ length: Math.ceil(total / 10) }, (_, i) => (
          <Button key={i + 1} variant={page === i + 1 ? 'solid' : 'ghost'} onClick={() => setPage(i + 1)}>{i + 1}</Button>
        ))}
      </Stack>
    </div>
  );
}

function ProductDetail({ id, onBack, cart }: { id: string; onBack: () => void; cart: any }) {
  const [product, setProduct] = useState<any>(null);
  useEffect(() => { apiClient.get(`${API_ROUTES.PRODUCTS}/${id}`).then(res => setProduct(res.data)); }, [id]);
  if (!product) return <Text>로딩중...</Text>;
  return (
    <Container maxWidth="800px">
      <Button variant="ghost" onClick={onBack}>← 목록으로</Button>
      <Stack direction="row" gap="var(--va-space-24)" style={{ marginTop: 16 }}>
        <div style={{ width: 300, height: 300, background: '#f0f0f0', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>상품 이미지</div>
        <div>
          <Heading level={2}>{product.name}</Heading>
          <Text variant="muted">{product.category}</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.price.toLocaleString()}원</Text>
          <Text>재고: {product.stock}개</Text>
          <Text style={{ marginTop: 16 }}>{product.description}</Text>
          <Button variant="solid" onClick={() => { cart.addItem({ productId: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl }); onBack(); }} style={{ marginTop: 16, padding: '12px 24px', fontSize: 16 }}>장바구니 담기</Button>
        </div>
      </Stack>
    </Container>
  );
}

function CartPage({ cart }: { cart: any }) {
  const handleOrder = async () => {
    const { user, token } = JSON.parse(localStorage.getItem('auth') || '{}');
    if (!user) { alert('로그인이 필요합니다'); return; }
    await apiClient.post(API_ROUTES.ORDERS, { userId: user.id, items: cart.items });
    cart.clearCart();
    alert('주문이 완료되었습니다');
  };
  return (
    <Container maxWidth="800px">
      <Heading level={2}>장바구니</Heading>
      {cart.items.length === 0 ? <Text>장바구니가 비어있습니다</Text> : (
        <>
          {cart.items.map((item: any) => (
            <Stack direction="row" justify="space-between" align="center" key={item.productId} style={{ padding: 12, borderBottom: '1px solid #eee' }}>
              <div><Text style={{ fontWeight: 'bold' }}>{item.name}</Text> - {item.price.toLocaleString()}원</div>
              <Stack direction="row" align="center" gap="var(--va-space-8)">
                <Button variant="outline" onClick={() => cart.updateQuantity(item.productId, item.quantity - 1)}>-</Button>
                <Text>{item.quantity}</Text>
                <Button variant="outline" onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}>+</Button>
                <Button variant="ghost" onClick={() => cart.removeItem(item.productId)}>삭제</Button>
              </Stack>
            </Stack>
          ))}
          <div style={{ textAlign: 'right', marginTop: 16, fontSize: 20, fontWeight: 'bold' }}>합계: {cart.getTotal().toLocaleString()}원</div>
          <Button variant="solid" onClick={handleOrder} style={{ width: '100%', marginTop: 16, padding: 16, fontSize: 18 }}>주문하기</Button>
        </>
      )}
    </Container>
  );
}

function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const { user, isAuthenticated } = useAuthStore();
  useEffect(() => {
    if (isAuthenticated && user) {
      apiClient.get(API_ROUTES.ORDERS, { params: { userId: user.id } }).then(res => setOrders(res.data));
    }
  }, [isAuthenticated, user]);
  if (!isAuthenticated) return <Container style={{ padding: 20, textAlign: 'center' }}><Text>로그인이 필요합니다</Text></Container>;
  return (
    <Container maxWidth="800px">
      <Heading level={2}>주문 내역</Heading>
      {orders.length === 0 ? <Text>주문 내역이 없습니다</Text> : orders.map(o => (
        <Card key={o.id} style={{ marginBottom: 12 }}>
          <Stack direction="row" justify="space-between">
            <Text style={{ fontWeight: 'bold' }}>주문번호: {o.id}</Text>
            <Badge tone="neutral" size="sm">{ORDER_STATUS[o.status] || o.status}</Badge>
          </Stack>
          <div style={{ marginTop: 8 }}>{o.items.map((i: any, idx: number) => <Text key={idx} as="div">{i.name} x{i.quantity} - {(i.price * i.quantity).toLocaleString()}원</Text>)}</div>
          <div style={{ textAlign: 'right', marginTop: 8, fontWeight: 'bold' }}>합계: {Number(o.total).toLocaleString()}원</div>
        </Card>
      ))}
    </Container>
  );
}

function LoginPage({ onBack, onLogin }: { onBack: () => void; onLogin: (user: any, token: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post(API_ROUTES.AUTH_LOGIN, { email, password });
      onLogin(res.data.user, res.data.token);
      onBack();
    } catch { alert('로그인 실패'); }
  };
  return (
    <Container maxWidth="400px" style={{ margin: '100px auto' }}>
      <Heading level={2}>로그인</Heading>
      <form onSubmit={handleSubmit}>
        <FormField label="이메일" fieldId="email">
          <Input id="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: 8 }} />
        </FormField>
        <FormField label="비밀번호" fieldId="password">
          <Input id="password" placeholder="비밀번호" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginBottom: 8 }} />
        </FormField>
        <Button type="submit" variant="solid" style={{ width: '100%', padding: 12 }}>로그인</Button>
        <Button type="button" variant="outline" onClick={onBack} style={{ width: '100%', padding: 12, marginTop: 8 }}>뒤로</Button>
      </form>
      <Text variant="caption" style={{ marginTop: 16 }}>테스트: customer@test.com / 1234</Text>
    </Container>
  );
}
