import { useState, useEffect, useCallback } from 'react';
import { productModel } from '../models/productModel';

export function useProductListPresenter() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await productModel.getProducts(category || undefined);
    setProducts(data);
    setLoading(false);
  }, [category]);

  useEffect(() => { load(); }, [load]);

  // Presenter formats data for the View
  const formattedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    priceLabel: `${Number(p.price).toLocaleString()}원`,
    stockLabel: `재고: ${p.stock}`,
    category: p.category,
  }));

  return { products: formattedProducts, category, setCategory, loading };
}
