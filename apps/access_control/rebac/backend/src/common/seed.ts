import { v4 as uuidv4 } from 'uuid';

export const SAMPLE_PRODUCTS = [
  { id: 'p1', name: '무선 이어폰', price: 89000, stock: 50, category: '전자제품', imageUrl: '/headphones.jpg', description: '고품질 무선 블루투스 이어폰' },
  { id: 'p2', name: '런닝화', price: 120000, stock: 30, category: '의류', imageUrl: '/shoes.jpg', description: '가벼운 런닝화' },
  { id: 'p3', name: '커피 원두', price: 25000, stock: 100, category: '식품', imageUrl: '/coffee.jpg', description: '에티오피아 원두 500g' },
  { id: 'p4', name: '코딩 책', price: 35000, stock: 40, category: '도서', imageUrl: '/book.jpg', description: '클린 코드 가이드' },
  { id: 'p5', name: '텀블러', price: 18000, stock: 60, category: '생활', imageUrl: '/tumbler.jpg', description: '스테인리스 텀블러 500ml' },
];

export const SAMPLE_USERS = [
  { id: 'u1', email: 'customer@test.com', name: '김고객', role: 'customer', password: '1234' },
  { id: 'u2', email: 'seller@test.com', name: '이판매', role: 'seller', password: '1234' },
  { id: 'u3', email: 'cs@test.com', name: '박상담', role: 'cs-agent', password: '1234' },
  { id: 'u4', email: 'admin@test.com', name: '최관리', role: 'admin', password: '1234' },
];
