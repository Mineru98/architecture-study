/**
 * 인메모리 정책 저장소
 * 7개 시드 정책 포함
 */

import type { Policy, PolicyEffect } from "./policy.types.js";

// ============================================================================
// 시드 정책 정의 (우선순위 순)
// ============================================================================

const SEED_POLICIES: Policy[] = [
  {
    id: "policy-100",
    name: "Admin Full Access",
    priority: 100,
    effect: "allow",
    description: "관리자는 모든 리소스에 대해 모든 작업 가능 (업무시간 제한도 무시)",
    conditions: [
      { attribute: "subject.role", operator: "eq", value: "admin" }
    ],
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "policy-91",
    name: "High Value Refund Trusted Allow",
    priority: 91,
    effect: "allow",
    description: "고액 환불(>=100,000원)은 신뢰된 네트워크 + 신뢰수준 3 이상만 허용",
    conditions: [
      { attribute: "action.action", operator: "eq", value: "refund" },
      { attribute: "resource.value", operator: "gte", value: 100000 },
      { attribute: "environment.isTrustedNetwork", operator: "eq", value: true },
      { attribute: "subject.trustLevel", operator: "gte", value: 3 }
    ],
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "policy-90",
    name: "High Value Refund Deny",
    priority: 90,
    effect: "deny",
    description: "고액 환불(>=100,000원)은 신뢰된 네트워크가 아니면 거부",
    conditions: [
      { attribute: "action.action", operator: "eq", value: "refund" },
      { attribute: "resource.value", operator: "gte", value: 100000 }
    ],
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "policy-85",
    name: "Business Hours Only",
    priority: 85,
    effect: "deny",
    description: "업무시간(09:00-18:00) 외에는 수정/삭제 거부",
    conditions: [
      {
        attribute: "action.action",
        operator: "in",
        value: ["update", "delete"]
      },
      {
        attribute: "environment.hour",
        operator: "in",
        value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23]
      }
    ],
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "policy-80",
    name: "Seller Own Product Update",
    priority: 80,
    effect: "allow",
    description: "판매자는 자신의 상품만 수정 가능",
    conditions: [
      { attribute: "subject.role", operator: "eq", value: "seller" },
      { attribute: "action.action", operator: "eq", value: "update" },
      { attribute: "subject.ownerId", operator: "eq", value: "${resource.ownerId}" }
    ],
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "policy-20",
    name: "Default Refund Allow",
    priority: 20,
    effect: "allow",
    description: "저액 환불(<100,000원)은 기본 허용",
    conditions: [
      { attribute: "action.action", operator: "eq", value: "refund" },
      { attribute: "resource.value", operator: "lt", value: 100000 }
    ],
    createdAt: new Date("2026-01-01"),
  },
  {
    id: "policy-10",
    name: "Default Read Allow",
    priority: 10,
    effect: "allow",
    description: "읽기 작업은 기본 허용",
    conditions: [
      { attribute: "action.action", operator: "eq", value: "read" }
    ],
    createdAt: new Date("2026-01-01"),
  }
];

// ============================================================================
// Policy Store 구현
// ============================================================================

/**
 * 인메모리 정책 저장소
 * Singleton 패턴으로 전역 상태 관리
 */
class PolicyStore {
  private policies: Map<string, Policy> = new Map();
  private initialized = false;

  /**
   * 정책 저장소 초기화 (시드 정책 로드)
   */
  initialize(): void {
    if (this.initialized) return;

    this.policies.clear();
    for (const policy of SEED_POLICIES) {
      this.policies.set(policy.id, policy);
    }
    this.initialized = true;
    console.log(`[PolicyStore] ${SEED_POLICIES.length}개 시드 정책 로드 완료`);
  }

  /**
   * 모든 정책 조회 (우선순위 내림차순)
   */
  getAllPolicies(): Policy[] {
    return Array.from(this.policies.values())
      .sort((a, b) => b.priority - a.priority);
  }

  /**
   * ID로 정책 조회
   */
  getPolicyById(id: string): Policy | undefined {
    return this.policies.get(id);
  }

  /**
   * 정책 추가 (동적 정책 확장을 위한 인터페이스)
   */
  addPolicy(policy: Policy): void {
    this.policies.set(policy.id, policy);
  }

  /**
   * 모든 정책 삭제 (재초기화를 위한 인터페이스)
   */
  clearPolicies(): void {
    this.policies.clear();
    this.initialized = false;
  }

  /**
   * 저장소 상태 확인
   */
  isInitialized(): boolean {
    return this.initialized;
  }
}

// Singleton 인스턴스 (ES Module 전역 상태)
const policyStore = new PolicyStore();

export { policyStore };
export { SEED_POLICIES };