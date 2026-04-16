import { useState } from 'react';
import { authModel } from '../models/productModel';
import { useAuthStore } from '../shared/store/authStore';

export function useAuthPresenter() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);

  const onLogin = async () => {
    try {
      const result = await authModel.login(email, password);
      if (result) setAuth(result.user, result.token);
      else setError('로그인 실패');
    } catch { setError('로그인 실패'); }
  };

  return { email, setEmail, password, setPassword, error, onLogin, user, logout };
}
