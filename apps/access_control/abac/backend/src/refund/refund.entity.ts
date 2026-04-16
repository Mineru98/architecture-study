/**
 * 환불 엔티티
 * 인메모리 스토어 사용
 */

export type RefundStatus = "pending" | "approved" | "rejected";

export interface Refund {
  id: string;
  userId: string;
  productId: string;
  amount: number;
  status: RefundStatus;
  createdAt: Date;
}

// 인메모리 환불 스토어
const refunds: Refund[] = [
  { id: "ref-1", userId: "user-4", productId: "prod-1", amount: 50000, status: "approved", createdAt: new Date("2026-02-01") },
  { id: "ref-2", userId: "user-5", productId: "prod-2", amount: 30000, status: "pending", createdAt: new Date("2026-02-02") },
  { id: "ref-3", userId: "user-4", productId: "prod-3", amount: 150000, status: "pending", createdAt: new Date("2026-02-03") },
];

export const refundStore = {
  findAll: () => [...refunds],
  findById: (id: string) => refunds.find(r => r.id === id),
  create: (data: Omit<Refund, "id" | "createdAt">) => {
    const refund: Refund = {
      id: `ref-${Date.now()}`,
      ...data,
      createdAt: new Date(),
    };
    refunds.push(refund);
    return refund;
  },
};