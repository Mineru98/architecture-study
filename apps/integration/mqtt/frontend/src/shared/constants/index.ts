export const API_BASE = '/api/v1';

export const CATEGORIES = ['전자제품', '의류', '식품', '도서', '생활'] as const;

export const ORDER_STATUS_MAP: Record<string, string> = {
  pending: '대기',
  confirmed: '확인',
  shipped: '배송중',
  delivered: '배송완료',
  cancelled: '취소',
};

export const MQTT_TOPICS = {
  'shopping/products/+': '상품 이벤트',
  'shopping/orders/+/status': '주문 상태',
  'shopping/users/+': '사용자 이벤트',
} as const;
