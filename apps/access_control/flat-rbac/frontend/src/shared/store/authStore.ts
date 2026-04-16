import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  restore: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => {
    localStorage.setItem('auth', JSON.stringify({ user, token }));
    set({ user, token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('auth');
    set({ user: null, token: null, isAuthenticated: false });
  },
  restore: () => {
    const data = localStorage.getItem('auth');
    if (data) {
      const { user, token } = JSON.parse(data);
      set({ user, token, isAuthenticated: true });
    }
  },
}));
