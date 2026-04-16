import React, { useEffect, useState } from 'react';
import apiClient from '../../shared/api/apiClient';
import { CATEGORIES } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Card, Heading, Text } from '@vibe-architecture/react';

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const fetchProducts = async (cat?: string) => {
    const params: any = {};
    if (cat) params.category = cat;
    const res = await apiClient.get('/products', { params });
    setProducts(res.data.data);
  };

  useEffect(() => { fetchProducts(category || undefined); }, [category]);

  return (
    <div>
      <Heading level={2} style={{ padding: '20px 20px 0' }}>상품 목록 (JSON-RPC)</Heading>
      <Stack direction="row" gap="var(--va-space-8)" style={{ padding: 20, flexWrap: 'wrap' }}>
        <Button variant={!category ? 'solid' : 'outline'} onClick={() => setCategory('')}>전체</Button>
        {CATEGORIES.map((c) => (
          <Button key={c} variant={category === c ? 'solid' : 'outline'} onClick={() => setCategory(c)}>{c}</Button>
        ))}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, padding: 20 }}>
        {products.map((p) => (
          <Card key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/products/${p.id}`)}>
            <Heading level={4}>{p.name}</Heading>
            <Text variant="muted">{p.description}</Text>
            <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>{Number(p.price).toLocaleString()}원</Text>
            <Text variant="caption">재고: {p.stock}</Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
