import { dispatcher } from '../dispatcher/AppDispatcher';
import apiClient from '../shared/api/apiClient';

export const ProductActions = {
  loadProducts: async (category?: string) => {
    dispatcher.dispatch({ type: 'LOAD_PRODUCTS_START' });
    try {
      const products = await apiClient.get('/products', { params: { category } }).then((r) => r.data);
      dispatcher.dispatch({ type: 'LOAD_PRODUCTS_SUCCESS', payload: { products } });
    } catch {
      dispatcher.dispatch({ type: 'LOAD_PRODUCTS_ERROR' });
    }
  },

  loadProduct: async (id: string) => {
    dispatcher.dispatch({ type: 'LOAD_PRODUCT_START' });
    try {
      const product = await apiClient.get(`/products/${id}`).then((r) => r.data);
      dispatcher.dispatch({ type: 'LOAD_PRODUCT_SUCCESS', payload: { product } });
    } catch {
      dispatcher.dispatch({ type: 'LOAD_PRODUCT_ERROR' });
    }
  },
};
