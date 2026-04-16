/**
 * 속성 타입 정의
 * SRAE (Subject, Resource, Action, Environment) 4속성 구조
 */

/** 역할 타입 */
export type UserRole = "admin" | "seller" | "customer";

/** 액션 타입 */
export type ActionType = "read" | "create" | "update" | "delete" | "refund";

/** 리소스 타입 */
export type ResourceType = "user" | "product" | "refund";

/**
 * SubjectAttributes - 접근을 요청하는 주체
 */
export interface SubjectAttributes {
  userId: string;
  role: UserRole;
  trustLevel: number;       // 1-5
  ownerId?: string;         // 판매자 소유자 ID
}

/**
 * ResourceAttributes - 접근 대상 리소스
 */
export interface ResourceAttributes {
  resourceType: ResourceType;
  resourceId: string;
  ownerId: string;
  value?: number;            // 금액 (환불/상품)
}

/**
 * ActionAttributes - 수행하려는 액션
 */
export interface ActionAttributes {
  action: ActionType;
}

/**
 * EnvironmentAttributes - 접근 시점 환경 정보
 */
export interface EnvironmentAttributes {
  timestamp: Date;
  hour: number;             // 0-23
  ipAddress: string;
  isTrustedNetwork: boolean;
}