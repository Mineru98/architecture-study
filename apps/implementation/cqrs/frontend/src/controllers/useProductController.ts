import { useState, useEffect, useCallback } from 'react';
import { productModel } from '../models/productModel';
import { useCartStore } from '../shared/store/cartStore';

export function useProductController() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);

  const loadProducts = useCallback(async () => {
    const data = await productModel.fetchProducts(category || undefined, page);
    setProducts(data);
  }, [category, page]);

  useEffect(() => { loadProducts(); }, [loadProducts]);

  return { products, category, setCategory, page, setPage, reload: loadProducts };
}

export function useProductDetailController(productId: string) {
  const [product, setProduct] = useState<any>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    productModel.fetchProduct(productId).then(setProduct);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem({ productId: product.id, name: product.name, price: Number(product.price) });
    }
  };

  return { product, handleAddToCart };
}
