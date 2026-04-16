import { useState, useEffect, useMemo } from 'react';
import { productModel } from '../models/productModel';
import { useCartStore } from '../shared/store/cartStore';

export function useProductDetailViewModel(productId: string) {
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    productModel.fetchProduct(productId).then(setProduct);
  }, [productId]);

  // ViewModel: computed derived state + validation
  const isValid = useMemo(() => product && product.stock >= quantity && quantity > 0, [product, quantity]);
  const totalPrice = useMemo(() => product ? Number(product.price) * quantity : 0, [product, quantity]);
  const stockWarning = useMemo(() => {
    if (!product) return '';
    if (product.stock === 0) return '품절';
    if (product.stock < 5) return `재고 ${product.stock}개 남음`;
    return '';
  }, [product]);

  const addToCart = () => {
    if (!isValid || !product) return;
    addItem({ productId: product.id, name: product.name, price: Number(product.price) });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // ViewModel returns both state and computed + actions
  return { product, quantity, setQuantity, isValid, totalPrice, stockWarning, addToCart, addedToCart };
}
