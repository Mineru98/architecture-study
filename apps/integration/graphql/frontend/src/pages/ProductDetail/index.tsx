import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { graphqlRequest, queries } from '../../shared/api/graphqlClient';
import { useCartStore } from '../../shared/store/cartStore';
import { Container, Button, Heading, Text, Card } from '@vibe-architecture/react';
import type { Product, ProductData } from './types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await graphqlRequest<ProductData>(queries.product, { id });
        setProduct(data.product);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <Text>상품을 불러오는 중...</Text>;
  if (!product) return <Text>상품을 찾을 수 없습니다.</Text>;

  return (
    <Container maxWidth="600px" style={{ margin: '0 auto' }}>
      <Button variant="outline" onClick={() => navigate('/')} style={{ marginBottom: '16px' }}>뒤로가기</Button>
      <Card style={{ padding: '24px' }}>
        <Heading level={2}>{product.name}</Heading>
        <Text variant="muted">카테고리: {product.category}</Text>
        <Text style={{ color: '#e94560', fontWeight: 'bold', fontSize: '24px' }}>{product.price.toLocaleString()}원</Text>
        <Text>재고: {product.stock}개</Text>
        <Text style={{ marginTop: '16px', lineHeight: '1.6' }}>{product.description}</Text>
        <Button
          variant="solid"
          onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
          style={{ marginTop: '16px', padding: '10px 24px', fontSize: '16px' }}
        >
          장바구니에 추가
        </Button>
      </Card>
    </Container>
  );
};

export default ProductDetail;
