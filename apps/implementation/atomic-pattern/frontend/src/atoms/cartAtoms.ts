import { atom, useAtom } from './core';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export const cartItemsAtom = atom<CartItem[]>([]);

export const cartTotalAtom = atom<{ total: number; count: number }>({
  total: 0,
  count: 0,
});

export function useCartActions() {
  const [items, setItems] = useAtom(cartItemsAtom);
  const [, setTotal] = useAtom(cartTotalAtom);

  const recalc = (list: CartItem[]) => {
    setTotal({
      total: list.reduce((s, i) => s + i.price * i.quantity, 0),
      count: list.reduce((s, i) => s + i.quantity, 0),
    });
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    const updated = items.some((i) => i.productId === item.productId)
      ? items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      : [...items, { ...item, quantity: 1 }];
    setItems(updated);
    recalc(updated);
  };

  const removeFromCart = (productId: string) => {
    const updated = items.filter((i) => i.productId !== productId);
    setItems(updated);
    recalc(updated);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const updated =
      quantity <= 0
        ? items.filter((i) => i.productId !== productId)
        : items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          );
    setItems(updated);
    recalc(updated);
  };

  const clearCart = () => {
    setItems([]);
    setTotal({ total: 0, count: 0 });
  };

  return { addToCart, removeFromCart, updateQuantity, clearCart };
}
