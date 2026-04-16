import React from 'react';
interface BadgeProps { text: string; color?: string; }
export const Badge: React.FC<BadgeProps> = ({ text, color = '#666' }) => (
  <span style={{ background: color, color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>{text}</span>
);
