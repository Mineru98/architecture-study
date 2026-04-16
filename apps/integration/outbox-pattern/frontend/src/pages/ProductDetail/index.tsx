import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../shared/api/apiClient';
import { useCartStore } from '../../shared/store/cartStore';
import { Container, Button, Heading, Text } from '@vibe-architecture/react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) apiClient.get(`/products/${id}`).then((res) => setProduct(res.data.data));
  }, [id]);

  if (!product) return <Container maxWidth="600px" style={{ margin: '20px auto' }}>로딩중...</Container>;

  const handleAddToCart = () => {
    addItem({ productId: product.id, name: product.name, price: Number(product.price) });
    alert('장바구니에 추가되었습니다.');
  };

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Button variant="outline" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← 뒤로</Button>
      <Heading level={2}>{product.name}</Heading>
      <Text variant="muted">{product.description}</Text>
      <Text style={{ fontSize: 24, fontWeight: 700, color: '#673ab7' }}>{Number(product.price).toLocaleString()}원</Text>
      <Text>카테고리: {product.category} | 재고: {product.stock}</Text>
      <Button variant="solid" onClick={handleAddToCart} style={{ marginTop: 16, padding: '12px 24px', fontSize: 16 }}>장바구니 담기</Button>
    </Container>
  );
}
