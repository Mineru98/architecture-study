// === Subject ===
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'seller';
  department: string;
  trustLevel: number;
}

// === Resource ===
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  ownerId: string;
}

export interface Refund {
  id: string;
  orderId: string;
  productId: string;
  amount: number;
  reason: string;
  status: string;
  requesterId: string;
}

export type ResourceItem =
  | { type: 'product'; data: Product }
  | { type: 'refund'; data: Refund };

// === Action ===
export type ActionType = 'read' | 'update' | 'delete' | 'refund';

// === Environment ===
export interface EnvironmentConfig {
  ipAddress: string;
  currentHour: number;
  isTrustedNetwork: boolean;
}

// === Policy ===
export interface AttributeCondition {
  attribute: string;
  operator: string;
  value: any;
}

export interface PolicyRule {
  subject?: AttributeCondition[];
  resource?: AttributeCondition[];
  action?: AttributeCondition[];
  environment?: AttributeCondition[];
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  priority: number;
  effect: 'allow' | 'deny';
  rules: PolicyRule;
  enabled: boolean;
}

// === Access Decision ===
export interface PolicyMatchDetail {
  group: string;
  attribute: string;
  operator: string;
  expected: any;
  actual: any;
  result: boolean;
}

export interface PolicyMatch {
  policy: Policy;
  matched: boolean;
  details: PolicyMatchDetail[];
}

export interface AccessDecision {
  allowed: boolean;
  matchedPolicies: PolicyMatch[];
  appliedPolicy: Policy | null;
  reason: string;
  timestamp: string;
}

// === Access Check Request ===
export interface AccessCheckRequest {
  subjectId: string;
  resourceType: string;
  resourceId: string;
  action: ActionType;
  environment?: Partial<EnvironmentConfig>;
}

// === Audit Log Entry ===
export interface AuditLogEntry {
  id: string;
  allowed: boolean;
  matchedPolicies: PolicyMatch[];
  appliedPolicy: Policy | null;
  reason: string;
  timestamp: string;
  request: {
    subjectId: string;
    resourceType: string;
    resourceId: string;
    action: string;
  };
}
