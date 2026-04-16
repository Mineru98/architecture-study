import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchProduct } from '../../store/slices/productSlice';
import { addItem } from '../../store/slices/cartSlice';
import { selectCurrentProduct } from '../../store/selectors';
import { Container, Button, Heading, Text } from '@vibe-architecture/react';

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectCurrentProduct);
  const navigate = useNavigate();

  useEffect(() => { dispatch(fetchProduct(id!)); }, [dispatch, id]);

  const handleAdd = () => {
    if (product) dispatch(addItem({ productId: product.id, name: product.name, price: Number(product.price) }));
  };

  if (!product) return <Container maxWidth="600px" style={{ margin: '20px auto' }}>로딩중...</Container>;

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Button variant="outline" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← 뒤로</Button>
      <Heading level={2}>{product.name}</Heading>
      <Text variant="muted">{product.description}</Text>
      <Text style={{ fontSize: 24, fontWeight: 700, color: '#2196f3' }}>{Number(product.price).toLocaleString()}원</Text>
      <Button variant="solid" onClick={handleAdd} style={{ marginTop: 16, padding: '12px 24px', fontSize: 16 }}>장바구니 담기</Button>
    </Container>
  );
}
