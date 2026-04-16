import React from 'react';
import { useAuthViewModel } from '../../viewmodels/useAuthViewModel';
import { Container, Heading, Input, Button, Text, FormField } from '@vibe-architecture/react';

export default function Login() {
  const vm = useAuthViewModel();

  if (vm.user) {
    return (
      <Container maxWidth="400px" style={{ margin: '60px auto' }}>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <Heading level={3}>{vm.user.name}님 환영합니다</Heading>
          <Text>{vm.user.email} ({vm.user.role})</Text>
          <Button variant="outline" onClick={vm.logout} style={{ marginTop: 16 }}>로그아웃</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="400px" style={{ margin: '60px auto' }}>
      <Heading level={2}>로그인</Heading>
      {vm.error && <Text style={{ color: 'red', marginBottom: 12 }}>{vm.error}</Text>}
      <FormField label="이메일" fieldId="email">
        <Input id="email" placeholder="이메일" value={vm.email} onChange={(e) => vm.setEmail(e.target.value)} style={{ marginBottom: 12 }} />
      </FormField>
      <FormField label="비밀번호" fieldId="password">
        <Input id="password" placeholder="비밀번호" type="password" value={vm.password} onChange={(e) => vm.setPassword(e.target.value)} style={{ marginBottom: 12 }} />
      </FormField>
      <Button variant="solid" onClick={vm.login} disabled={!vm.isFormValid || vm.submitting} style={{ width: '100%', padding: 14, fontSize: 16 }}>
        {vm.submitting ? '로그인중...' : '로그인'}
      </Button>
    </Container>
  );
}
