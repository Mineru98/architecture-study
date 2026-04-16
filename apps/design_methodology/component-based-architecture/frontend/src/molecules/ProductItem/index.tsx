import React from 'react';
import { Stack, Button, Card, Heading, Text } from '@vibe-architecture/react';
interface ProductItemProps { product: any; onAddToCart: (p: any) => void; }
export const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => (
  <Card>
    <div style={{ height: 100, background: '#f0f0f0', borderRadius: 4, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>이미지</div>
    <Heading level={4}>{product.name}</Heading>
    <Text variant="caption">{product.category}</Text>
    <Text style={{ fontWeight: 'bold' }}>{product.price.toLocaleString()}원</Text>
    <Button variant="solid" onClick={() => onAddToCart(product)} style={{ width: '100%', marginTop: 8 }}>담기</Button>
  </Card>
);
