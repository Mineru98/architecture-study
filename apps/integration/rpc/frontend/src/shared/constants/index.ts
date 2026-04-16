export const API_BASE = '/api/rpc';

export const CATEGORIES = ['전자제품', '의류', '식품', '도서', '생활'] as const;

export const ORDER_STATUS_MAP: Record<string, string> = {
  pending: '대기',
  confirmed: '확인',
  shipped: '배송중',
  delivered: '배송완료',
  cancelled: '취소',
};
