import React, { useState, useEffect } from 'react';
import { Stack, Input, Button, Card, Heading, Text } from '@vibe-architecture/react';
import apiClient from '../../shared/api/apiClient';
import { CATEGORIES } from '../../shared/constants';
import { Product } from './types';

const ProductList: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('전체');
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiClient.get('/products', { params: { category } }).then((res) => {
      setProducts(res.data.items || res.data);
    });
  }, [category]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Heading level={2}>상품 목록</Heading>
      <Input
        type="text"
        placeholder="상품 검색..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '16px' }}
      />
      <Stack direction="row" gap="var(--va-space-8)" style={{ marginBottom: '16px' }}>
        {CATEGORIES.map((c) => (
          <Button
            key={c}
            variant={category === c ? 'solid' : 'outline'}
            onClick={() => setCategory(c)}
          >
            {c}
          </Button>
        ))}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {filtered.map((p) => (
          <Card key={p.id} style={{ cursor: 'pointer' }} onClick={() => onNavigate(`/products/${p.id}`)}>
            <div style={{ height: '120px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📦
            </div>
            <Heading level={4}>{p.name}</Heading>
            <Text variant="caption">{p.category}</Text>
            <Text variant="body" style={{ fontWeight: 'bold', marginTop: '4px' }}>{p.price.toLocaleString()}원</Text>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
