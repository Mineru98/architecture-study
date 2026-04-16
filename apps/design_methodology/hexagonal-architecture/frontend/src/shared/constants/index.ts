export const CATEGORIES = ['전체', '전자제품', '의류', '식품', '도서', '생활'];

export const ORDER_STATUS: Record<string, string> = {
  pending: '결제 대기',
  paid: '결제 완료',
  shipped: '배송 중',
  delivered: '배송 완료',
  cancelled: '주문 취소',
};

export const API_ROUTES = {
  PRODUCTS: '/products',
  ORDERS: '/orders',
  AUTH_LOGIN: '/auth/login',
  AUTH_ME: '/auth/me',
} as const;
