export interface Refund {
  id: string;
  orderId: string;
  productId: string;
  amount: number;
  reason: string;
  status: string;
  requesterId: string;
  createdAt: string;
}

export const seedRefunds: Refund[] = [
  {
    id: "ref-1",
    orderId: "order-1",
    productId: "prod-1",
    amount: 150000,
    reason: "화면 불량",
    status: "pending",
    requesterId: "user-seller-a",
    createdAt: new Date().toISOString(),
  },
  {
    id: "ref-2",
    orderId: "order-2",
    productId: "prod-2",
    amount: 45000,
    reason: "사이즈 교환",
    status: "pending",
    requesterId: "user-seller-b",
    createdAt: new Date().toISOString(),
  },
];
