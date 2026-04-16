import React, { useState } from 'react';
import { Container, Heading, FormField, Input, Button, Text } from '@vibe-architecture/react';
import apiClient from '../../shared/api/apiClient';
import { useAuthStore } from '../../shared/store/authStore';

const Login: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      onNavigate('/');
    } catch {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <Container maxWidth="400px" style={{ marginTop: '40px' }}>
      <Heading level={2}>로그인</Heading>
      {error && <Text variant="body" style={{ color: 'red' }}>{error}</Text>}
      <form onSubmit={handleSubmit}>
        <FormField label="이메일" fieldId="email">
          <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </FormField>
        <FormField label="비밀번호" fieldId="password">
          <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </FormField>
        <Button type="submit" variant="solid" style={{ width: '100%', marginTop: '12px' }}>로그인</Button>
      </form>
      <Text variant="caption" style={{ marginTop: '16px' }}>
        테스트 계정: customer@test.com / 1234, seller@test.com / 1234, cs@test.com / 1234, admin@test.com / 1234
      </Text>
    </Container>
  );
};

export default Login;
