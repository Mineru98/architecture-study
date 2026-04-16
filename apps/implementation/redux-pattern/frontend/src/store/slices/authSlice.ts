import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../shared/api/apiClient';

interface AuthState { user: { id: string; email: string; name: string; role: string } | null; token: string | null; error: string; }

const initialState: AuthState = { user: null, token: null, error: '' };

export const login = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
  const res = await apiClient.post('/auth/login', { email, password });
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => { state.user = null; state.token = null; localStorage.removeItem('auth'); },
    restoreSession: (state) => {
      const data = localStorage.getItem('auth');
      if (data) {
        try { const { user, token } = JSON.parse(data); state.user = user; state.token = token; } catch {}
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = '';
        localStorage.setItem('auth', JSON.stringify({ user: action.payload.user, token: action.payload.token }));
      })
      .addCase(login.rejected, (state) => { state.error = '로그인 실패'; });
  },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
