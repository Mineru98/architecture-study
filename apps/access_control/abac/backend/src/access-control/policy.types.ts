export type PolicyEffect = 'allow' | 'deny';
export type ConditionOperator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'contains';

export interface Condition {
  field: string;
  operator: ConditionOperator;
  value: unknown;
}

export interface Policy {
  id: string;
  name: string;
  description: string;
  priority: number;
  effect: PolicyEffect;
  conditions: Condition[];
}

export interface EvaluationContext {
  subject: Record<string, unknown>;
  resource: Record<string, unknown>;
  action: string;
  environment: Record<string, unknown>;
}

export interface DecisionResult {
  allowed: boolean;
  reason: string;
  matchedPolicy?: Policy;
}

export interface AuditEntry {
  timestamp: Date;
  subject: Record<string, unknown>;
  resource: Record<string, unknown>;
  action: string;
  environment: Record<string, unknown>;
  result: DecisionResult;
}
