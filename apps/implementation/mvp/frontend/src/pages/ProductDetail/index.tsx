import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetailViewModel } from '../../viewmodels/useProductDetailViewModel';
import { Container, Button, Heading, Text, Input, FormField } from '@vibe-architecture/react';

export default function ProductDetail() {
  const { id } = useParams();
  const vm = useProductDetailViewModel(id!);
  const navigate = useNavigate();

  if (!vm.product) return <Container maxWidth="600px" style={{ margin: '20px auto' }}>로딩중...</Container>;

  return (
    <Container maxWidth="600px" style={{ margin: '20px auto' }}>
      <Button variant="outline" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← 뒤로</Button>
      <Heading level={2}>{vm.product.name}</Heading>
      <Text variant="muted">{vm.product.description}</Text>
      <Text style={{ fontSize: 24, fontWeight: 700, color: '#2196f3' }}>{Number(vm.product.price).toLocaleString()}원</Text>
      {vm.stockWarning && <Text style={{ color: 'orange' }}>{vm.stockWarning}</Text>}
      <div style={{ margin: '16px 0' }}>
        <Stack direction="row" align="center" gap="var(--va-space-16)">
          <FormField label="수량" fieldId="quantity">
            <Input id="quantity" type="number" value={vm.quantity} onChange={(e) => vm.setQuantity(+e.target.value)} style={{ width: 60 }} />
          </FormField>
          <Text>총액: {vm.totalPrice.toLocaleString()}원</Text>
        </Stack>
      </div>
      <Button variant="solid" onClick={vm.addToCart} disabled={!vm.isValid} style={{ marginTop: 16, padding: '12px 24px', fontSize: 16 }}>
        {vm.addedToCart ? '추가됨!' : '장바구니 담기'}
      </Button>
    </Container>
  );
}
