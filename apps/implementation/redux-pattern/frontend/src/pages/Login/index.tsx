import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, logout, restoreSession } from '../../store/slices/authSlice';
import { selectUser, selectAuthError } from '../../store/selectors';
import { Container, Heading, Input, Button, Text, FormField } from '@vibe-architecture/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectAuthError);

  useEffect(() => { dispatch(restoreSession()); }, [dispatch]);

  if (user) {
    return (
      <Container maxWidth="400px" style={{ margin: '60px auto' }}>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <Heading level={3}>{user.name}님 환영합니다</Heading>
          <Text>{user.email} ({user.role})</Text>
          <Button variant="outline" onClick={() => dispatch(logout())} style={{ marginTop: 16 }}>로그아웃</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container maxWidth="400px" style={{ margin: '60px auto' }}>
      <Heading level={2}>로그인</Heading>
      {error && <Text style={{ color: 'red', marginBottom: 12 }}>{error}</Text>}
      <FormField label="이메일" fieldId="email">
        <Input id="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginBottom: 12 }} />
      </FormField>
      <FormField label="비밀번호" fieldId="password">
        <Input id="password" placeholder="비밀번호" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: 12 }} />
      </FormField>
      <Button variant="solid" onClick={() => dispatch(login({ email, password }))} style={{ width: '100%', padding: 14, fontSize: 16 }}>로그인</Button>
    </Container>
  );
}
