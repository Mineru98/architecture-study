import React from 'react';
import { Container, Divider } from '@vibe-architecture/react';
import { Header } from '../../organisms/Header';
interface ShopLayoutProps { children: React.ReactNode; cartCount: number; user: any; onNavigate: (page: string) => void; onLogout: () => void; }
export const ShopLayout: React.FC<ShopLayoutProps> = ({ children, cartCount, user, onNavigate, onLogout }) => (
  <Container>
    <Header cartCount={cartCount} user={user} onNavigate={onNavigate} onLogout={onLogout} />
    <Divider />
    {children}
  </Container>
);
