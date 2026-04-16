import { create } from 'zustand';

interface AuthState {
  user: { id: string; email: string; name: string; role: string } | null;
  token: string | null;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
  loadFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => {
    localStorage.setItem('auth', JSON.stringify({ user, token }));
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem('auth');
    set({ user: null, token: null });
  },
  loadFromStorage: () => {
    const data = localStorage.getItem('auth');
    if (data) {
      try {
        const { user, token } = JSON.parse(data);
        set({ user, token });
      } catch {
        localStorage.removeItem('auth');
      }
    }
  },
}));
