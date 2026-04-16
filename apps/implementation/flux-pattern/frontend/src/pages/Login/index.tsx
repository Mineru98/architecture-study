import React, { useState, useEffect } from 'react';
import { AuthStore } from '../../stores/authStore';
import { AuthActions } from '../../actions/authActions';
import { Container, Heading, Input, Button, Text, FormField } from '@vibe-architecture/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = AuthStore.subscribe(() => {
      setUser(AuthStore.getUser());
      setError(AuthStore.getError());
    });
    setUser(AuthStore.getUser());
    return unsubscribe;
  }, []);

  if (user) {
    return (
      <Container maxWidth="400px" style={{ margin: '60px auto' }}>
        <div style={{ padding: 20, textAlign: 'center' }}>
          <Heading level={3}>{user.name}님 환영합니다</Heading>
          <Text>{user.email} ({user.role})</Text>
          <Button variant="outline" onClick={() => AuthActions.logout()} style={{ marginTop: 16 }}>로그아웃</Button>
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
      <Button variant="solid" onClick={() => AuthActions.login(email, password)} style={{ width: '100%', padding: 14, fontSize: 16 }}>로그인</Button>
    </Container>
  );
}
