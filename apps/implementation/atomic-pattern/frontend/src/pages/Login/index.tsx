import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from '../../atoms/core';
import { userAtom, tokenAtom } from '../../atoms/authAtoms';
import apiClient from '../../shared/api/apiClient';
import { Container, Heading, Input, Button, Text, FormField } from '@vibe-architecture/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await apiClient.post('/auth/login', { email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인에 실패했습니다.');
    }
  };

  return (
    <Container maxWidth="400px" style={{ margin: '60px auto' }}>
      <Heading level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>로그인</Heading>
      <form onSubmit={handleSubmit}>
        <FormField label="이메일" fieldId="email">
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="customer@test.com" required style={{ marginBottom: 16 }} />
        </FormField>
        <FormField label="비밀번호" fieldId="password">
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="1234" required style={{ marginBottom: 16 }} />
        </FormField>
        {error && <Text style={{ color: '#e94560', fontSize: '13px', marginBottom: '16px' }}>{error}</Text>}
        <Button variant="solid" type="submit" style={{ width: '100%', padding: '12px', fontSize: '15px' }}>로그인</Button>
      </form>
      <Text variant="caption" style={{ marginTop: '20px', textAlign: 'center' }}>테스트 계정: customer@test.com / 1234</Text>
    </Container>
  );
}
