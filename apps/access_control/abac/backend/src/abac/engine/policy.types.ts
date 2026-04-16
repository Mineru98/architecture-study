/**
 * ABAC 정책 관련 타입 정의
 * Subject, Resource, Action, Environment 속성과 정책 구조체 포함
 */

/** 역할 타입 */
export type UserRole = "admin" | "seller" | "customer";

/** 액션 타입 */
export type ActionType = "read" | "create" | "update" | "delete" | "refund";

/** 리소스 타입 */
export type ResourceType = "user" | "product" | "refund";

/**
 * 주체(Subject) 속성 - 접근을 요청하는 사용자/시스템
 */
export interface SubjectAttributes {
  userId: string;
  role: UserRole;
  trustLevel: number;       // 1-5, 신뢰 수준
  ownerId?: string;          // 판매자 상품 소유자 ID
}

/**
 * 리소스(Resource) 속성 - 접근 대상이 되는 자원
 */
export interface ResourceAttributes {
  resourceType: ResourceType;
  resourceId: string;
  ownerId: string;            // 자원 소유자 ID
  value?: number;            // 상품 금액, 환불 금액 등
}

/**
 * 액션(Action) 속성 - 수행하려는 작업
 */
export interface ActionAttributes {
  action: ActionType;
}

/**
 * 환경(Environment) 속성 - 접근 시점의 맥락 정보
 */
export interface EnvironmentAttributes {
  timestamp: Date;
  hour: number;              // 0-23, 서버 시간(KST 기준)
  ipAddress: string;
  isTrustedNetwork: boolean;  // 내부 IP 여부 (10.x.x.x, 192.168.x.x 등)
}

/** 기본값이 적용된 환경 속성 */
export const defaultEnvironment: EnvironmentAttributes = {
  timestamp: new Date(),
  hour: new Date().getHours(),
  ipAddress: "127.0.0.1",
  isTrustedNetwork: false,
};

/** 조건 연산자 */
export type ConditionOperator =
  | "eq"     // 같음
  | "neq"    // 같지 않음
  | "gt"     // 초과
  | "gte"    // 이상
  | "lt"     // 미만
  | "lte"    // 이하
  | "in"     // 배열 포함
  | "contains"; // 문자열 포함

/**
 * 단일 조건 정의
 */
export interface Condition {
  attribute: string;         // 속성 경로 (e.g., "subject.role", "resource.value")
  operator: ConditionOperator;
  value: unknown;            // 비교 값
}

/**
 * 정책 효과 - allow 또는 deny
 */
export type PolicyEffect = "allow" | "deny";

/**
 * 정책 정의
 */
export interface Policy {
  id: string;
  name: string;
  priority: number;         // 0-100, 높을수록 우선
  effect: PolicyEffect;
  conditions: Condition[];   // AND 조건 배열 (모두 만족해야 매칭)
  description?: string;
  createdAt: Date;
}

/**
 * 접근 평가 컨텍스트
 */
export interface EvaluationContext {
  subject: SubjectAttributes;
  resource: ResourceAttributes;
  action: ActionAttributes;
  environment: EnvironmentAttributes;
}

/**
 * 접근 결정 결과
 */
export interface DecisionResult {
  decision: PolicyEffect;    // "allow" | "deny"
  reason: string;            // 결정 근거 설명
  matchedPolicy?: Policy;    // 매칭된 정책 (없으면 기본 거부)
  evaluatedAt: string;       // ISO timestamp
  processingTimeMs: number;  // 평가 소요 시간
  cached: boolean;           // 캐시 히트 여부
}