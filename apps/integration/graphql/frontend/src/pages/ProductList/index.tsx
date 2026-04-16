import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { graphqlRequest, queries } from '../../shared/api/graphqlClient';
import { useCartStore } from '../../shared/store/cartStore';
import { Stack, Button, Card, Heading, Text } from '@vibe-architecture/react';
import type { Product, ProductListData } from './types';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await graphqlRequest<ProductListData>(queries.products);
        setProducts(data.products);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <Text>상품을 불러오는 중...</Text>;
  if (error) return <Text>에러: {error}</Text>;

  return (
    <div>
      <Heading level={2} style={{ marginBottom: '20px' }}>상품 목록</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
        {products.map((product) => (
          <Card key={product.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
            <Heading level={4} style={{ margin: '0 0 8px' }}>{product.name}</Heading>
            <Text variant="muted">{product.category}</Text>
            <Text style={{ color: '#e94560', fontWeight: 'bold', fontSize: '18px' }}>{product.price.toLocaleString()}원</Text>
            <Text variant="caption">재고: {product.stock}개</Text>
            <Button
              variant="solid"
              onClick={(e: any) => {
                e.stopPropagation();
                addItem({ id: product.id, name: product.name, price: product.price });
              }}
              style={{ marginTop: '8px', padding: '6px 12px' }}
            >
              장바구니 담기
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
