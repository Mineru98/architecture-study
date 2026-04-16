import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../shared/api/apiClient';

interface Product { id: string; name: string; description: string; price: number; stock: number; category: string; imageUrl: string; }
interface ProductState { items: Product[]; current: Product | null; loading: boolean; category: string; }

const initialState: ProductState = { items: [], current: null, loading: false, category: '' };

export const fetchProducts = createAsyncThunk('products/fetchAll', async (category?: string) => {
  const res = await apiClient.get('/products', { params: { category } });
  return res.data;
});

export const fetchProduct = createAsyncThunk('products/fetchOne', async (id: string) => {
  const res = await apiClient.get(`/products/${id}`);
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: { setCategory: (state, action: PayloadAction<string>) => { state.category = action.payload; } },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.items = action.payload; state.loading = false; })
      .addCase(fetchProduct.fulfilled, (state, action) => { state.current = action.payload; });
  },
});

export const { setCategory } = productSlice.actions;
export default productSlice.reducer;
