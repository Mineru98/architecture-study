import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProducts, setCategory } from '../../store/slices/productSlice';
import { selectProducts, selectProductLoading } from '../../store/selectors';
import { CATEGORIES } from '../../shared/constants';
import { Stack, Button, Card, Heading, Text, Container } from '@vibe-architecture/react';

export default function ProductList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductLoading);
  const category = useAppSelector((s) => s.products.category);
  const navigate = useNavigate();

  useEffect(() => { dispatch(fetchProducts(category || undefined)); }, [dispatch, category]);

  if (loading) return <Container maxWidth="72rem" style={{ padding: 20 }}>로딩중...</Container>;

  return (
    <div>
      <Heading level={2} style={{ padding: '20px 20px 0' }}>상품 목록</Heading>
      <Stack direction="row" gap="var(--va-space-8)" style={{ padding: 20, flexWrap: 'wrap' }}>
        <Button variant={!category ? 'solid' : 'outline'} onClick={() => dispatch(setCategory(''))}>전체</Button>
        {CATEGORIES.map((c) => <Button key={c} variant={category === c ? 'solid' : 'outline'} onClick={() => dispatch(setCategory(c))}>{c}</Button>)}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, padding: 20 }}>
        {products.map((p) => (
          <Card key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/products/${p.id}`)}>
            <Heading level={4}>{p.name}</Heading>
            <Text variant="muted">{p.description}</Text>
            <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>{Number(p.price).toLocaleString()}원</Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
