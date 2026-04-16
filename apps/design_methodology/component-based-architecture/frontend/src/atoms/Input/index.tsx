import React from 'react';
interface InputProps { placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; style?: React.CSSProperties; }
export const Input: React.FC<InputProps> = ({ placeholder, value, onChange, type = 'text', style }) => (
  <input placeholder={placeholder} value={value} onChange={onChange} type={type} style={{ padding: 8, border: '1px solid #ddd', borderRadius: 4, ...style }} />
);
