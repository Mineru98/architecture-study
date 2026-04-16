import React from 'react';
import { useProductController } from '../../controllers/useProductController';
import { CATEGORIES } from '../../shared/constants';
import { useNavigate } from 'react-router-dom';
import { Stack, Button, Card, Heading, Text, Container } from '@vibe-architecture/react';

export default function ProductList() {
  const { products, category, setCategory } = useProductController();
  const navigate = useNavigate();

  return (
    <div>
      <Heading level={2} style={{ padding: '20px 20px 0' }}>상품 목록</Heading>
      <Stack direction="row" gap="var(--va-space-8)" style={{ padding: 20, flexWrap: 'wrap' }}>
        <Button variant={!category ? 'solid' : 'outline'} onClick={() => setCategory('')}>전체</Button>
        {CATEGORIES.map((c) => (
          <Button key={c} variant={category === c ? 'solid' : 'outline'} onClick={() => setCategory(c)}>{c}</Button>
        ))}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, padding: 20 }}>
        {products.map((p: any) => (
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
