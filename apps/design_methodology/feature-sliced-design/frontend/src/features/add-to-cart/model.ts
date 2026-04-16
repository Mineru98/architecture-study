import { useCartStore } from '../../shared/store/cartStore';
export const useAddToCart = () => {
  const cart = useCartStore();
  return (product: { id: string; name: string; price: number; imageUrl: string }) => {
    cart.addItem({ productId: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl });
  };
};
