import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem { productId: string; name: string; price: number; quantity: number; }
interface CartState { items: CartItem[]; }

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existing = state.items.find((i) => i.productId === action.payload.productId);
      if (existing) { existing.quantity += 1; }
      else { state.items.push({ ...action.payload, quantity: 1 }); }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
      const item = state.items.find((i) => i.productId === action.payload.productId);
      if (item) {
        if (action.payload.quantity <= 0) state.items = state.items.filter((i) => i.productId !== action.payload.productId);
        else item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => { state.items = []; },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
