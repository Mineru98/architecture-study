import { dispatcher } from '../dispatcher/AppDispatcher';
import apiClient from '../shared/api/apiClient';

export const AuthActions = {
  login: async (email: string, password: string) => {
    dispatcher.dispatch({ type: 'LOGIN_START' });
    try {
      const result = await apiClient.post('/auth/login', { email, password }).then((r) => r.data);
      if (result) {
        localStorage.setItem('auth', JSON.stringify({ user: result.user, token: result.token }));
        dispatcher.dispatch({ type: 'LOGIN_SUCCESS', payload: { user: result.user, token: result.token } });
      } else {
        dispatcher.dispatch({ type: 'LOGIN_ERROR', payload: { error: '로그인 실패' } });
      }
    } catch {
      dispatcher.dispatch({ type: 'LOGIN_ERROR', payload: { error: '로그인 실패' } });
    }
  },

  logout: () => {
    localStorage.removeItem('auth');
    dispatcher.dispatch({ type: 'LOGOUT' });
  },

  restoreSession: () => {
    const data = localStorage.getItem('auth');
    if (data) {
      try {
        const { user, token } = JSON.parse(data);
        dispatcher.dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
      } catch {}
    }
  },
};
