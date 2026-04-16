import React from 'react';
import { ProductCard } from '../../molecules/ProductCard';
interface ProductGridProps { products: any[]; onSelect: (id: string) => void; onAddToCart: (product: any) => void; }
export const ProductGrid: React.FC<ProductGridProps> = ({ products, onSelect, onAddToCart }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
    {products.map(p => <ProductCard key={p.id} product={p} onSelect={onSelect} onAddToCart={onAddToCart} />)}
  </div>
);
