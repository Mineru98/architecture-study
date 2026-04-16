import type { RootState } from '../index';

export const selectProducts = (state: RootState) => state.products.items;
export const selectCurrentProduct = (state: RootState) => state.products.current;
export const selectProductLoading = (state: RootState) => state.products.loading;
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.error;
