import React from 'react';
interface PriceTextProps { price: number; size?: number; }
export const PriceText: React.FC<PriceTextProps> = ({ price, size = 16 }) => (
  <span style={{ fontWeight: 'bold', fontSize: size }}>{price.toLocaleString()}원</span>
);
