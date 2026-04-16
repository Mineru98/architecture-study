/**
 * 환불 서비스
 */

import { refundStore, type Refund } from "./refund.entity.js";

export class RefundService {
  findAll(): Refund[] {
    return refundStore.findAll();
  }

  findById(id: string): Refund | undefined {
    return refundStore.findById(id);
  }

  create(data: { userId: string; productId: string; amount: number; status: "pending" | "approved" | "rejected" }): Refund {
    return refundStore.create(data);
  }
}