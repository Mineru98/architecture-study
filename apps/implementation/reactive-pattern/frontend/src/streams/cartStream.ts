import { BehaviorSubject, Observable } from 'rxjs';
import { tap, debounceTime, skip } from 'rxjs/operators';

export interface CartItem { productId: string; name: string; price: number; quantity: number; }
interface CartState { items: CartItem[]; }

const initialState: CartState = { items: [] };
const cartSubject = new BehaviorSubject<CartState>(initialState);

// Auto-save cart to localStorage on change (debounced)
cartSubject.pipe(
  skip(1), // skip initial value
  debounceTime(500),
  tap((state) => localStorage.setItem('cart', JSON.stringify(state.items))),
).subscribe();

// Restore from localStorage
try {
  const saved = localStorage.getItem('cart');
  if (saved) cartSubject.next({ items: JSON.parse(saved) });
} catch {}

export const cartStream = {
  getState: () => cartSubject.getValue(),
  subscribe: (observer: (state: CartState) => void) => cartSubject.subscribe(observer),
  addItem: (item: Omit<CartItem, 'quantity'>) => {
    const state = cartSubject.getValue();
    const existing = state.items.find((i) => i.productId === item.productId);
    if (existing) {
      cartSubject.next({ items: state.items.map((i) => i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      cartSubject.next({ items: [...state.items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (productId: string) => {
    cartSubject.next({ items: cartSubject.getValue().items.filter((i) => i.productId !== productId) });
  },
  updateQuantity: (productId: string, quantity: number) => {
    const items = quantity <= 0
      ? cartSubject.getValue().items.filter((i) => i.productId !== productId)
      : cartSubject.getValue().items.map((i) => i.productId === productId ? { ...i, quantity } : i);
    cartSubject.next({ items });
  },
  clearCart: () => { cartSubject.next({ items: [] }); localStorage.removeItem('cart'); },
  getTotal: () => cartSubject.getValue().items.reduce((s, i) => s + i.price * i.quantity, 0),
  get state$(): Observable<CartState> { return cartSubject.asObservable(); },
};
