import React from 'react';
interface ButtonProps { children: React.ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'danger'; style?: React.CSSProperties; }
export const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', style }) => {
  const colors = { primary: '#4CAF50', secondary: '#2196F3', danger: '#f44336' };
  return <button onClick={onClick} style={{ padding: '8px 16px', background: colors[variant], color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', ...style }}>{children}</button>;
};
