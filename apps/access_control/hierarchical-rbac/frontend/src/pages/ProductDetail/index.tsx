import React, { useState, useEffect } from 'react';
import { Stack, Button, Heading, Text } from '@vibe-architecture/react';
import apiClient from '../../shared/api/apiClient';
import { useCartStore } from '../../shared/store/cartStore';
import { Product } from './types';

const ProductDetail: React.FC<{ productId: string; onNavigate: (path: string) => void }> = ({ productId, onNavigate }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    apiClient.get(`/products/${productId}`).then((res) => setProduct(res.data));
  }, [productId]);

  if (!product) return <Text>로딩 중...</Text>;

  return (
    <div>
      <Button variant="ghost" onClick={() => onNavigate('/')} style={{ marginBottom: '16px' }}>← 목록으로</Button>
      <Stack direction="row" gap="var(--va-space-24)">
        <div style={{ width: '300px', height: '300px', background: '#f0f0f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
          📦
        </div>
        <div style={{ flex: 1 }}>
          <Heading level={2}>{product.name}</Heading>
          <Text variant="muted">{product.category}</Text>
          <Text>{product.description}</Text>
          <Text variant="body" style={{ fontSize: '24px', fontWeight: 'bold', margin: '16px 0' }}>{product.price.toLocaleString()}원</Text>
          <Text>재고: {product.stock}개</Text>
          <Stack direction="row" gap="var(--va-space-8)" align="center" style={{ marginTop: '16px' }}>
            <Button variant="outline" onClick={() => setQty(Math.max(1, qty - 1))}>-</Button>
            <Text>{qty}</Text>
            <Button variant="outline" onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</Button>
            <Button
              variant="solid"
              onClick={() => {
                addItem({ productId: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
                alert('장바구니에 추가되었습니다.');
              }}
            >
              장바구니 담기
            </Button>
          </Stack>
        </div>
      </Stack>
    </div>
  );
};

export default ProductDetail;
