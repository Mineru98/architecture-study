import { BehaviorSubject, Observable } from 'rxjs';
import apiClient from '../shared/api/apiClient';

interface AuthState { user: any | null; token: string | null; error: string; }

const initialState: AuthState = { user: null, token: null, error: '' };
const authSubject = new BehaviorSubject<AuthState>(initialState);

// Restore session
try {
  const data = localStorage.getItem('auth');
  if (data) { const { user, token } = JSON.parse(data); authSubject.next({ user, token, error: '' }); }
} catch {}

export const authStream = {
  getState: () => authSubject.getValue(),
  subscribe: (observer: (state: AuthState) => void) => authSubject.subscribe(observer),
  login: async (email: string, password: string) => {
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      if (res.data) {
        const { user, token } = res.data;
        localStorage.setItem('auth', JSON.stringify({ user, token }));
        authSubject.next({ user, token, error: '' });
      } else {
        authSubject.next({ ...authSubject.getValue(), error: '로그인 실패' });
      }
    } catch { authSubject.next({ ...authSubject.getValue(), error: '로그인 실패' }); }
  },
  logout: () => { localStorage.removeItem('auth'); authSubject.next({ user: null, token: null, error: '' }); },
  get state$(): Observable<AuthState> { return authSubject.asObservable(); },
};
