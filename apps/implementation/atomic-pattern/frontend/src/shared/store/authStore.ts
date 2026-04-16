import { create } from 'zustand';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthStore {
  user: AuthUser | null;
  token: string;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: '',
  setAuth: (user, token) => {
    localStorage.setItem('auth', JSON.stringify({ token, user }));
    set({ user, token });
  },
  clearAuth: () => {
    localStorage.removeItem('auth');
    set({ user: null, token: '' });
  },
  isAuthenticated: () => !!get().token,
}));
