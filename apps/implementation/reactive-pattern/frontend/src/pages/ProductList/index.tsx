import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productStream } from '../../streams/productStream';
import { CATEGORIES } from '../../shared/constants';
import { Stack, Button, Card, Heading, Text, Container } from '@vibe-architecture/react';

export default function ProductList() {
  const [state, setState] = useState(productStream.getState());
  const navigate = useNavigate();

  useEffect(() => {
    const sub = productStream.state$.subscribe(setState);
    return () => sub.unsubscribe();
  }, []);

  return (
    <div>
      <Heading level={2} style={{ padding: '20px 20px 0' }}>상품 목록</Heading>
      <Stack direction="row" gap="var(--va-space-8)" style={{ padding: 20, flexWrap: 'wrap' }}>
        <Button variant={!state.category ? 'solid' : 'outline'} onClick={() => productStream.setCategory('')}>전체</Button>
        {CATEGORIES.map((c) => <Button key={c} variant={state.category === c ? 'solid' : 'outline'} onClick={() => productStream.setCategory(c)}>{c}</Button>)}
      </Stack>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, padding: 20 }}>
        {state.products.map((p: any) => (
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
