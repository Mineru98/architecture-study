// ABAC 도메인 타입 (SRAE: Subject, Resource, Action, Environment)

export interface Subject {
  userId: string;
  role: 'admin' | 'seller' | 'user';
  trustLevel?: number; // 1-5
}

export interface Resource {
  type: 'product' | 'refund' | 'user';
  id: string;
  ownerId?: string;
  amount?: number; // 환불 금액
}

export interface Action {
  type: 'read' | 'create' | 'update' | 'delete';
  name: string;
}

export interface Environment {
  hour: number; // KST 시간 (0-23)
  trustedNetwork: boolean;
}

export interface Policy {
  id: string;
  name: string;
  priority: number;
  effect: 'allow' | 'deny';
  conditions: Condition[];
  description?: string;
}

export interface Condition {
  attribute: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';
  value: unknown;
}

export interface AccessDecision {
  decision: 'allow' | 'deny';
  reason: string;
  matchedPolicy?: Policy;
  evaluatedAt: string;
  cached: boolean;
}

// API 요청/응답 타입
export interface AccessCheckRequest {
  subject: Subject;
  resource: Resource;
  action: string;
  environment?: {
    ipAddress?: string;
  };
}

export interface AccessCheckResponse extends AccessDecision {}

export interface AuditLogItem {
  id: string;
  userId: string;
  resourceType: string;
  resourceId: string;
  action: string;
  decision: 'allow' | 'deny';
  reason: string;
  ipAddress: string;
  timestamp: string;
  processingTimeMs: number;
}