import { dispatcher } from '../dispatcher/AppDispatcher';

interface ProductState {
  products: any[];
  currentProduct: any | null;
  loading: boolean;
}

let state: ProductState = { products: [], currentProduct: null, loading: false };
type ChangeListener = () => void;
const listeners: ChangeListener[] = [];

export const ProductStore = {
  getState: () => state,
  subscribe: (listener: ChangeListener): (() => void) => {
    listeners.push(listener);
    return () => { const i = listeners.indexOf(listener); if (i >= 0) listeners.splice(i, 1); };
  },
  emitChange: () => listeners.forEach((l) => l()),
};

dispatcher.register((action: any) => {
  switch (action.type) {
    case 'LOAD_PRODUCTS_START':
      state = { ...state, loading: true };
      ProductStore.emitChange();
      break;
    case 'LOAD_PRODUCTS_SUCCESS':
      state = { ...state, products: action.payload.products, loading: false };
      ProductStore.emitChange();
      break;
    case 'LOAD_PRODUCT_SUCCESS':
      state = { ...state, currentProduct: action.payload.product, loading: false };
      ProductStore.emitChange();
      break;
    case 'LOAD_PRODUCTS_ERROR':
    case 'LOAD_PRODUCT_ERROR':
      state = { ...state, loading: false };
      ProductStore.emitChange();
      break;
  }
});
