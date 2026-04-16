import { useState, useEffect, useCallback, useMemo } from 'react';
import { productModel } from '../models/productModel';

export function useProductListViewModel() {
  const [products, setProducts] = useState<any[]>([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await productModel.fetchProducts(category || undefined, page);
    setProducts(data);
    setLoading(false);
  }, [category, page]);

  useEffect(() => { load(); }, [load]);

  // ViewModel: computed/derived state
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], [products]);

  const totalCount = products.length;

  return { products, category, setCategory, loading, page, setPage, categories, totalCount };
}
