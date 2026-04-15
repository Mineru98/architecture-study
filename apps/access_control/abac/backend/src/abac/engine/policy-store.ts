import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { Policy } from "./policy.types";

const seedPolicies: Policy[] = [
  {
    id: "admin-full-access",
    name: "Admin Full Access",
    description: "관리자는 모든 작업을 허용한다",
    priority: 100,
    effect: "allow",
    enabled: true,
    rules: {
      subject: [{ attribute: "role", operator: "eq", value: "admin" }],
    },
  },
  {
    id: "seller-own-product",
    name: "Seller Own Product Update",
    description: "판매자는 자신의 상품만 수정할 수 있다",
    priority: 80,
    effect: "allow",
    enabled: true,
    rules: {
      subject: [{ attribute: "role", operator: "eq", value: "seller" }],
      action: [{ attribute: "type", operator: "eq", value: "update" }],
      resource: [{ attribute: "ownerId", operator: "eq", value: "${subject.userId}" }],
    },
  },
  {
    id: "refund-high-value-trusted-allow",
    name: "High Value Refund Trusted Allow",
    description: "고액 환불은 신뢰 네트워크 + 높은 신뢰 레벨일 때 허용",
    priority: 91,
    effect: "allow",
    enabled: true,
    rules: {
      action: [{ attribute: "type", operator: "eq", value: "refund" }],
      resource: [{ attribute: "amount", operator: "gte", value: 100000 }],
      environment: [{ attribute: "isTrustedNetwork", operator: "eq", value: true }],
      subject: [{ attribute: "trustLevel", operator: "gte", value: 3 }],
    },
  },
  {
    id: "refund-high-value-deny",
    name: "High Value Refund Deny",
    description: "고액 환불 기본 차단",
    priority: 90,
    effect: "deny",
    enabled: true,
    rules: {
      action: [{ attribute: "type", operator: "eq", value: "refund" }],
      resource: [{ attribute: "amount", operator: "gte", value: 100000 }],
    },
  },
  {
    id: "business-hours-only",
    name: "Business Hours Only",
    description: "업무 시간(9~18시) 외 수정/삭제 차단",
    priority: 85,
    effect: "deny",
    enabled: true,
    rules: {
      action: [{ attribute: "type", operator: "in", value: ["update", "delete"] }],
      environment: [{ attribute: "currentHour", operator: "lt", value: 9 }],
    },
  },
  {
    id: "business-hours-only-evening",
    name: "Business Hours Only (Evening)",
    description: "업무 시간(9~18시) 외 수정/삭제 차단 (저녁)",
    priority: 85,
    effect: "deny",
    enabled: true,
    rules: {
      action: [{ attribute: "type", operator: "in", value: ["update", "delete"] }],
      environment: [{ attribute: "currentHour", operator: "gte", value: 18 }],
    },
  },
  {
    id: "default-refund-allow",
    name: "Default Refund Allow",
    description: "저액 환불은 기본적으로 허용",
    priority: 20,
    effect: "allow",
    enabled: true,
    rules: {
      action: [{ attribute: "type", operator: "eq", value: "refund" }],
    },
  },
  {
    id: "default-read-allow",
    name: "Default Read Allow",
    description: "읽기 작업은 기본적으로 허용",
    priority: 10,
    effect: "allow",
    enabled: true,
    rules: {
      action: [{ attribute: "type", operator: "eq", value: "read" }],
    },
  },
];

@Injectable()
export class PolicyStore {
  private policies: Policy[] = [...seedPolicies];

  getAll(): Policy[] {
    return this.policies;
  }

  getById(id: string): Policy | undefined {
    return this.policies.find((p) => p.id === id);
  }

  create(policy: Omit<Policy, "id">): Policy {
    const newPolicy: Policy = { id: uuidv4(), ...policy };
    this.policies.push(newPolicy);
    return newPolicy;
  }

  update(id: string, partial: Partial<Omit<Policy, "id">>): Policy | null {
    const index = this.policies.findIndex((p) => p.id === id);
    if (index === -1) return null;
    this.policies[index] = { ...this.policies[index], ...partial };
    return this.policies[index];
  }

  delete(id: string): boolean {
    const index = this.policies.findIndex((p) => p.id === id);
    if (index === -1) return false;
    this.policies.splice(index, 1);
    return true;
  }
}
