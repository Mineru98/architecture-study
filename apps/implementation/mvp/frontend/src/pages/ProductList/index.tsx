import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductListViewModel } from '../../viewmodels/useProductListViewModel';
import { CATEGORIES } from '../../shared/constants';
import { Stack, Button, Card, Heading, Text, Container } from '@vibe-architecture/react';

export default function ProductList() {
  const vm = useProductListViewModel();
  const navigate = useNavigate();

  return (
    <div>
      <Heading level={2} style={{ padding: '20px 20px 0' }}>상품 목록 ({vm.totalCount}개)</Heading>
      <Stack direction="row" gap="var(--va-space-8)" style={{ padding: 20, flexWrap: 'wrap' }}>
        <Button variant={!vm.category ? 'solid' : 'outline'} onClick={() => vm.setCategory('')}>전체</Button>
        {CATEGORIES.map((c) => <Button key={c} variant={vm.category === c ? 'solid' : 'outline'} onClick={() => vm.setCategory(c)}>{c}</Button>)}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, padding: 20 }}>
        {vm.products.map((p: any) => (
          <Card key={p.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/products/${p.id}`)}>
            <Heading level={4}>{p.name}</Heading>
            <Text variant="muted">{p.description}</Text>
            <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>{Number(p.price).toLocaleString()}원</Text>
          </Card>
        ))}
      </div>
    </div>
  );
}
