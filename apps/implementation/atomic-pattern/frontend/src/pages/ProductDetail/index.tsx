import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAtom } from '../../atoms/core';
import { selectedProductAtom, loadingAtom } from '../../atoms/productAtoms';
import { useCartActions } from '../../atoms/cartAtoms';
import apiClient from '../../shared/api/apiClient';
import { Stack, Button, Heading, Text, Badge } from '@vibe-architecture/react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useAtom(selectedProductAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const { addToCart } = useCartActions();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const { data } = await apiClient.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>로딩 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div>
      <Button variant="outline" as={Link} to="/" style={{ marginBottom: '16px' }}>← 목록으로</Button>
      <Stack direction="row" gap="var(--va-space-32)" style={{ marginTop: '16px' }}>
        <div style={{ width: '360px', height: '360px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
          {product.imageUrl || '이미지 없음'}
        </div>
        <div style={{ flex: 1 }}>
          <Text variant="caption" style={{ marginBottom: '8px' }}>{product.category}</Text>
          <Heading level={2} style={{ margin: '0 0 16px 0' }}>{product.name}</Heading>
          <Text style={{ fontSize: '28px', fontWeight: 700, color: '#e94560', marginBottom: '16px' }}>
            {Number(product.price).toLocaleString()}원
          </Text>
          <Text variant="muted" style={{ lineHeight: 1.6, marginBottom: '16px' }}>{product.description}</Text>
          <Text variant="muted" style={{ marginBottom: '24px' }}>재고: {product.stock}개</Text>
          <Button
            variant="solid"
            onClick={() => addToCart({ productId: product.id, name: product.name, price: Number(product.price), imageUrl: product.imageUrl })}
            disabled={product.stock === 0}
            style={{ padding: '12px 32px', fontSize: '16px' }}
          >
            {product.stock === 0 ? '품절' : '장바구니 담기'}
          </Button>
        </div>
      </Stack>
    </div>
  );
}
