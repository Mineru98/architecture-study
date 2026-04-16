import React from 'react';
import { ProductItem } from '../../molecules/ProductItem';
interface ProductListProps { products: any[]; onAddToCart: (p: any) => void; }
export const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
    {products.map(p => <ProductItem key={p.id} product={p} onAddToCart={onAddToCart} />)}
  </div>
);
