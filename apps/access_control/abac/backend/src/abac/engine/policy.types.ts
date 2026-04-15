export interface AttributeCondition {
  attribute: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "contains";
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
  effect: "allow" | "deny";
  rules: PolicyRule;
  enabled: boolean;
}

export interface AccessRequest {
  subject: Record<string, any>;
  resource: Record<string, any>;
  action: Record<string, any>;
  environment: Record<string, any>;
}

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
