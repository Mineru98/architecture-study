import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productStream } from '../../streams/productStream';
import { cartStream } from '../../streams/cartStream';
import { Container, Button, Heading, Text } from '@vibe-architecture/react';

export default function ProductDetail() {
  const { id } = useParams();
  const [state, setState] = useState(productStream.getState());
  const navigate = useNavigate();

  useEffect(() => {
    productStream.loadProduct(id!);
    const sub = productStream.state$.subscribe(setState);
    return () => sub.unsubscribe();
  }, [id]);

  const handleAdd = () => {
    if (state.current) cartStream.addItem({ productId: state.current.id, name: state.current.name, price: Number(state.current.price) });
  };

  if (!state.current) return <Container maxWidth="600px" style={{ margin: '20px auto' }}>로딩중...</Container>;

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Button variant="outline" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← 뒤로</Button>
      <Heading level={2}>{state.current.name}</Heading>
      <Text variant="muted">{state.current.description}</Text>
      <Text style={{ fontSize: 24, fontWeight: 700, color: '#2196f3' }}>{Number(state.current.price).toLocaleString()}원</Text>
      <Button variant="solid" onClick={handleAdd} style={{ marginTop: 16, padding: '12px 24px', fontSize: 16 }}>장바구니 담기</Button>
    </Container>
  );
}
