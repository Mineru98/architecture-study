import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import apiClient from '../shared/api/apiClient';

interface ProductState { products: any[]; current: any | null; loading: boolean; category: string; }

const initialState: ProductState = { products: [], current: null, loading: false, category: '' };

// BehaviorSubject holds current state and emits to new subscribers
const productSubject = new BehaviorSubject<ProductState>(initialState);

// Category change stream with debounce
const categorySubject = new BehaviorSubject<string>('');

// Subscribe to category changes -> fetch products
categorySubject.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  tap(() => productSubject.next({ ...productSubject.getValue(), loading: true })),
  switchMap(async (category) => {
    const res = await apiClient.get('/products', { params: { category: category || undefined } });
    return res.data;
  }),
).subscribe((products) => {
  productSubject.next({ ...productSubject.getValue(), products, loading: false });
});

export const productStream = {
  getState: () => productSubject.getValue(),
  subscribe: (observer: (state: ProductState) => void) => productSubject.subscribe(observer),
  setCategory: (category: string) => {
    productSubject.next({ ...productSubject.getValue(), category });
    categorySubject.next(category);
  },
  loadProduct: async (id: string) => {
    productSubject.next({ ...productSubject.getValue(), loading: true });
    const res = await apiClient.get(`/products/${id}`);
    productSubject.next({ ...productSubject.getValue(), current: res.data, loading: false });
  },
  get state$(): Observable<ProductState> { return productSubject.asObservable(); },
};
