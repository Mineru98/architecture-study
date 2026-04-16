import React from 'react';
import { Button, Card, Heading, Badge, Text } from '@vibe-architecture/react';
interface ProductCardProps { product: any; onSelect: (id: string) => void; onAddToCart: (product: any) => void; }
export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onAddToCart }) => (
  <Card style={{ cursor: 'pointer' }} onClick={() => onSelect(product.id)}>
    <div style={{ height: 120, background: '#f0f0f0', borderRadius: 4, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>이미지</div>
    <Stack direction="row" justify="space-between" align="center">
      <Heading level={4}>{product.name}</Heading>
      <Badge tone="neutral" size="sm">{product.category}</Badge>
    </Stack>
    <Text style={{ fontWeight: 'bold' }}>{product.price.toLocaleString()}원</Text>
    <div style={{ marginTop: 8 }}>
      <Button variant="solid" style={{ width: '100%' }} onClick={(e: any) => { e.stopPropagation(); onAddToCart(product); }}>담기</Button>
    </div>
  </Card>
);
