import React from 'react';
interface CardProps { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void; }
export const Card: React.FC<CardProps> = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, cursor: onClick ? 'pointer' : 'default', ...style }}>{children}</div>
);
