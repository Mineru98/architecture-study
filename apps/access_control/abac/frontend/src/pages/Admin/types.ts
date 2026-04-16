export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; name: string; price: number; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
}

export interface Policy {
  id?: string;
  name: string;
  priority: number;
  effect: string;
  conditions: unknown;
}

export interface EvaluationRequest {
  subject: {
    role: string;
    trustLevel: number;
  };
  resource: {
    type: string;
    amount: number;
    ownerId: string;
  };
  action: string;
  environment: {
    hour: number;
    trustedNetwork: boolean;
  };
}

export interface EvaluationResult {
  decision: string;
  reason: string;
  matchedPolicyName?: string;
}

export interface AuditLogEntry {
  id?: string;
  timestamp: string;
  subject: { id?: string; role?: string; [key: string]: unknown };
  resource: { [key: string]: unknown };
  action: string;
  environment: { [key: string]: unknown };
  result: {
    allowed: boolean;
    reason: string;
    matchedPolicy?: { id?: string; name?: string } | null;
  };
}
