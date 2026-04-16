import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../shared/api/apiClient';

interface Order { id: string; userId: string; items: any[]; total: number; status: string; createdAt: string; }
interface OrderState { orders: Order[]; loading: boolean; }

const initialState: OrderState = { orders: [], loading: false };

export const fetchOrders = createAsyncThunk('orders/fetchAll', async (userId: string) => {
  const res = await apiClient.get('/orders', { params: { userId } });
  return res.data;
});

export const createOrder = createAsyncThunk('orders/create', async (data: { userId: string; items: any[]; total: number }) => {
  const res = await apiClient.post('/orders', data);
  return res.data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchOrders.fulfilled, (state, action) => { state.orders = action.payload; state.loading = false; });
  },
});

export default orderSlice.reducer;
