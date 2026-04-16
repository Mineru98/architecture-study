import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductStore } from '../../stores/productStore';
import { ProductActions } from '../../actions/productActions';
import { CartActions } from '../../actions/cartActions';
import { Container, Button, Heading, Text } from '@vibe-architecture/react';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = ProductStore.subscribe(() => {
      setProduct(ProductStore.getState().currentProduct);
    });
    ProductActions.loadProduct(id!);
    return unsubscribe;
  }, [id]);

  const handleAdd = () => {
    if (product) CartActions.addItem({ productId: product.id, name: product.name, price: Number(product.price) });
  };

  if (!product) return <Container maxWidth="600px" style={{ margin: '20px auto' }}>로딩중...</Container>;

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Button variant="outline" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← 뒤로</Button>
      <Heading level={2}>{product.name}</Heading>
      <Text variant="muted">{product.description}</Text>
      <Text style={{ fontSize: 24, fontWeight: 700, color: '#2196f3' }}>{Number(product.price).toLocaleString()}원</Text>
      <Text>재고: {product.stock}</Text>
      <Button variant="solid" onClick={handleAdd} style={{ marginTop: 16, padding: '12px 24px', fontSize: 16 }}>장바구니 담기</Button>
    </Container>
  );
}
