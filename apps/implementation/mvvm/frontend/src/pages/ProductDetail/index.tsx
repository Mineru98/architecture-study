import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetailPresenter } from '../../presenters/useProductDetailPresenter';
import { Container, Button, Heading, Text } from '@vibe-architecture/react';

export default function ProductDetail() {
  const { id } = useParams();
  const { product, onAddToCart, added } = useProductDetailPresenter(id!);
  const navigate = useNavigate();

  if (!product) return <Container maxWidth="600px" style={{ margin: '20px auto' }}>로딩중...</Container>;

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Button variant="outline" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← 뒤로</Button>
      <Heading level={2}>{product.name}</Heading>
      <Text variant="muted">{product.description}</Text>
      <Text style={{ fontSize: 24, fontWeight: 700, color: '#2196f3' }}>{product.priceLabel}</Text>
      <Text>카테고리: {product.category} | 재고: {product.stock}</Text>
      <Button variant="solid" onClick={onAddToCart} style={{ marginTop: 16, padding: '12px 24px', fontSize: 16 }}>{added ? '추가됨!' : '장바구니 담기'}</Button>
    </Container>
  );
}
