import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Refund, seedRefunds } from "./refund.data";
import { CreateRefundDto } from "./dto/create-refund.dto";

@Injectable()
export class RefundService {
  private readonly refunds: Refund[] = [...seedRefunds];

  findAll(): Refund[] {
    return this.refunds;
  }

  findById(id: string): Refund | undefined {
    return this.refunds.find((r) => r.id === id);
  }

  create(dto: CreateRefundDto, requesterId: string): Refund {
    const newRefund: Refund = {
      id: uuidv4(),
      ...dto,
      status: "pending",
      requesterId,
      createdAt: new Date().toISOString(),
    };
    this.refunds.unshift(newRefund);
    return newRefund;
  }
}
