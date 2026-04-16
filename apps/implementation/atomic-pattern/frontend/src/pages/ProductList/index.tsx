import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from '../../atoms/core';
import { productListAtom, categoryFilterAtom, loadingAtom } from '../../atoms/productAtoms';
import apiClient from '../../shared/api/apiClient';
import { CATEGORIES } from '../../shared/constants';
import { Stack, Button, Card, Heading, Text, Badge } from '@vibe-architecture/react';

export default function ProductList() {
  const [products, setProducts] = useAtom(productListAtom);
  const [category, setCategory] = useAtom(categoryFilterAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await apiClient.get('/products');
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = category ? products.filter((p) => p.category === category) : products;

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</div>;

  return (
    <div>
      <Heading level={2} style={{ marginBottom: '16px' }}>상품 목록</Heading>
      <Stack direction="row" gap="var(--va-space-8)" style={{ marginBottom: '20px', flexWrap: 'wrap' }}>
        <Button variant={!category ? 'solid' : 'outline'} onClick={() => setCategory('')}>전체</Button>
        {CATEGORIES.map((cat) => (
          <Button key={cat} variant={category === cat ? 'solid' : 'outline'} onClick={() => setCategory(cat)}>{cat}</Button>
        ))}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filtered.map((product) => (
          <Card key={product.id} style={{ cursor: 'pointer' }} onClick={() => window.location.hash = `#/product/${product.id}`}>
            <Text variant="caption" style={{ marginBottom: '4px' }}>{product.category}</Text>
            <Heading level={4} style={{ marginBottom: '8px' }}>{product.name}</Heading>
            <Text style={{ color: '#e94560', fontWeight: 700 }}>{product.price.toLocaleString()}원</Text>
            <Text variant="caption" style={{ marginTop: '4px' }}>재고: {product.stock}개</Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
