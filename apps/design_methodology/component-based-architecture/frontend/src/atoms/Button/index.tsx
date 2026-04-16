import React from 'react';
interface ButtonProps { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary'; style?: React.CSSProperties; }
export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', style }) => (
  <button onClick={onClick} style={{ padding: '8px 16px', background: variant === 'primary' ? '#4CAF50' : '#2196F3', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', ...style }}>{children}</button>
);
