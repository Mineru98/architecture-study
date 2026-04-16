import React, { useState, useEffect } from 'react';
import { Stack, Button, Heading, Text } from '@vibe-architecture/react';
import apiClient from '../../shared/api/apiClient';
import { useAuthStore } from '../../shared/store/authStore';
import { ORDER_STATUS } from '../../shared/constants';
import { Product, Order } from './types';

const Admin: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    apiClient.get('/products').then((res) => setProducts(res.data.items || res.data));
    apiClient.get('/orders').then((res) => setOrders(res.data));
  }, []);

  if (!user || user.role !== 'admin') {
    return <Text>관리자 권한이 필요합니다.</Text>;
  }

  const deleteProduct = async (id: string) => {
    await apiClient.delete(`/products/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateStatus = async (id: string, status: string) => {
    await apiClient.patch(`/orders/${id}/status`, { status });
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div>
      <Heading level={2}>관리자 패널</Heading>
      <Stack direction="row" gap="var(--va-space-8)" style={{ marginBottom: '16px' }}>
        <Button variant={tab === 'products' ? 'solid' : 'outline'} onClick={() => setTab('products')}>상품 관리</Button>
        <Button variant={tab === 'orders' ? 'solid' : 'outline'} onClick={() => setTab('orders')}>주문 관리</Button>
      </Stack>

      {tab === 'products' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>ID</th><th style={th}>이름</th><th style={th}>가격</th><th style={th}>재고</th><th style={th}>카테고리</th><th style={th}>관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td style={td}>{p.id.slice(0, 8)}</td>
                <td style={td}>{p.name}</td>
                <td style={td}>{p.price.toLocaleString()}원</td>
                <td style={td}>{p.stock}</td>
                <td style={td}>{p.category}</td>
                <td style={td}><Button variant="ghost" onClick={() => deleteProduct(p.id)} style={{ color: 'red' }}>삭제</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'orders' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>주문번호</th><th style={th}>사용자</th><th style={th}>금액</th><th style={th}>상태</th><th style={th}>관리</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td style={td}>{o.id.slice(0, 8)}</td>
                <td style={td}>{o.userId}</td>
                <td style={td}>{Number(o.total).toLocaleString()}원</td>
                <td style={td}>{ORDER_STATUS[o.status] || o.status}</td>
                <td style={td}>
                  <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} style={{ padding: '4px' }}>
                    <option value="pending">결제 대기</option>
                    <option value="paid">결제 완료</option>
                    <option value="shipped">배송 중</option>
                    <option value="delivered">배송 완료</option>
                    <option value="cancelled">주문 취소</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const th: React.CSSProperties = { border: '1px solid #ddd', padding: '8px', background: '#f5f5f5', textAlign: 'left' };
const td: React.CSSProperties = { border: '1px solid #ddd', padding: '8px' };

export default Admin;
