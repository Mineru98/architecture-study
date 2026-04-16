import React, { useState } from 'react';
import { Container, Heading, FormField, Input, Button, Text } from '@vibe-architecture/react';
import { loginApi } from '../../entities/user/api';
import { useAuthStore } from '../../shared/store/authStore';
export const LoginPage = ({ onBack }: { onBack: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { const data = await loginApi(email, password); login(data.user, data.token); onBack(); } catch { alert('로그인 실패'); }
  };
  return (
    <Container maxWidth="400px" style={{ margin: '100px auto' }}>
      <Heading level={2}>로그인</Heading>
      <form onSubmit={handleSubmit}>
        <FormField label="이메일" fieldId="email"><Input id="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: 8 }} /></FormField>
        <FormField label="비밀번호" fieldId="password"><Input id="password" placeholder="비밀번호" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginBottom: 8 }} /></FormField>
        <Button type="submit" variant="solid" style={{ width: '100%', padding: 12 }}>로그인</Button>
      </form>
      <Text variant="caption" style={{ marginTop: 16 }}>테스트: customer@test.com / 1234</Text>
    </Container>
  );
};
