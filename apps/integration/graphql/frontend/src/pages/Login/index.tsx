import React, { useState } from 'react';
import { graphqlRequest, mutations } from '../../shared/api/graphqlClient';
import { useAuthStore } from '../../shared/store/authStore';
import { Container, Heading, Input, Button, Text, FormField } from '@vibe-architecture/react';
import type { LoginInput, LoginResponse } from './types';

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginInput>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const { setAuth, logout, user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await graphqlRequest<{ login: string }>(mutations.login, { email: form.email, password: form.password });
      const parsed: LoginResponse = JSON.parse(data.login);
      setAuth(parsed.token, parsed.user);
    } catch (err: any) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  if (user) {
    return (
      <Container maxWidth="400px" style={{ margin: '0 auto', padding: '32px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <Heading level={2} style={{ marginTop: 0 }}>로그인 됨</Heading>
        <Text>이름: {user.name}</Text>
        <Text>이메일: {user.email}</Text>
        <Text>역할: {user.role}</Text>
        <Button variant="solid" onClick={logout} style={{ marginTop: '16px', width: '100%', background: '#e94560' }}>로그아웃</Button>
      </Container>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="400px" style={{ margin: '0 auto', padding: '32px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <Heading level={2} style={{ marginTop: 0 }}>로그인</Heading>
        {error && <Text style={{ color: 'red', fontSize: '14px' }}>{error}</Text>}
        <FormField label="이메일" fieldId="email">
          <Input id="email" type="email" placeholder="이메일" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required style={{ marginBottom: 12 }} />
        </FormField>
        <FormField label="비밀번호" fieldId="password">
          <Input id="password" type="password" placeholder="비밀번호" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required style={{ marginBottom: 12 }} />
        </FormField>
        <Button variant="solid" type="submit" style={{ width: '100%' }}>로그인</Button>
        <Text variant="caption" style={{ marginTop: '12px', textAlign: 'center' }}>테스트 계정: customer@test.com / test123</Text>
      </Container>
    </form>
  );
};

export default Login;
