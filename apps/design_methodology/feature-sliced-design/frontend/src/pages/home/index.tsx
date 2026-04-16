import React, { useState, useEffect } from 'react';
import { Stack, Button, Card, Heading, Text } from '@vibe-architecture/react';
import { fetchProducts } from '../../entities/product/api';
import { useAddToCart } from '../../features/add-to-cart/model';
import { CATEGORIES } from '../../shared/constants';
import { Product } from '../../entities/product/types';
export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('전체');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const addToCart = useAddToCart();

  useEffect(() => { fetchProducts(category, page).then(d => { setProducts(d.items); setTotal(d.total); }); }, [category, page]);

  return (
    <div>
      <Stack direction="row" gap="var(--va-space-8)" style={{ marginBottom: 16 }}>
        {CATEGORIES.map(c => <Button key={c} variant={category === c ? 'solid' : 'outline'} onClick={() => { setCategory(c); setPage(1); }}>{c}</Button>)}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {products.map(p => (
          <Card key={p.id}>
            <div style={{ height: 100, background: '#f0f0f0', borderRadius: 4, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>이미지</div>
            <Heading level={4}>{p.name}</Heading>
            <Text variant="muted">{p.category}</Text>
            <Text style={{ fontWeight: 'bold' }}>{p.price.toLocaleString()}원</Text>
            <Button variant="solid" onClick={() => addToCart(p)} style={{ width: '100%', marginTop: 8 }}>담기</Button>
          </Card>
        ))}
      </div>
      <Stack direction="row" justify="center" gap="var(--va-space-8)" style={{ marginTop: 20 }}>
        {Array.from({ length: Math.ceil(total / 10) }, (_, i) => <Button key={i+1} variant={page === i+1 ? 'solid' : 'ghost'} onClick={() => setPage(i+1)}>{i+1}</Button>)}
      </Stack>
    </div>
  );
};
