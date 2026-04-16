import { useState, useMemo } from 'react';
import { authModel } from '../models/productModel';
import { useAuthStore } from '../shared/store/authStore';

export function useAuthViewModel() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  // ViewModel: validation
  const isFormValid = useMemo(() => email.includes('@') && password.length >= 4, [email, password]);

  const login = async () => {
    if (!isFormValid) { setError('이메일과 비밀번호를 확인하세요'); return; }
    setSubmitting(true);
    try {
      const result = await authModel.login(email, password);
      if (result) setAuth(result.user, result.token);
      else setError('로그인 실패');
    } catch { setError('로그인 실패'); }
    setSubmitting(false);
  };

  return { email, setEmail, password, setPassword, error, isFormValid, submitting, login, user, logout };
}
