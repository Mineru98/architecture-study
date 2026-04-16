import { useState, useEffect } from 'react';
import { productModel } from '../models/productModel';
import { useCartStore } from '../shared/store/cartStore';

export function useProductDetailPresenter(productId: string) {
  const [product, setProduct] = useState<any>(null);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    productModel.getProduct(productId).then((data) => {
      setProduct(data ? {
        ...data,
        priceLabel: `${Number(data.price).toLocaleString()}원`,
      } : null);
    });
  }, [productId]);

  const onAddToCart = () => {
    if (!product) return;
    addItem({ productId: product.id, name: product.name, price: Number(product.price) });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return { product, onAddToCart, added };
}
