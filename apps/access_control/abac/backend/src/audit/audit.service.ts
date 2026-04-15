import { Injectable } from "@nestjs/common";
import { AccessDecision } from "../abac/engine/policy.types";

export interface AccessCheckInput {
  subjectId: string;
  resourceType: string;
  resourceId: string;
  action: string;
}

export interface AuditEntry {
  id: string;
  allowed: boolean;
  matchedPolicies: AccessDecision["matchedPolicies"];
  appliedPolicy: AccessDecision["appliedPolicy"];
  reason: string;
  timestamp: string;
  request: AccessCheckInput;
}

const MAX_ENTRIES = 200;

@Injectable()
export class AuditService {
  private readonly entries: AuditEntry[] = [];
  private counter = 0;

  log(decision: AccessDecision, request?: AccessCheckInput): AuditEntry {
    const entry: AuditEntry = {
      id: String(++this.counter),
      allowed: decision.allowed,
      matchedPolicies: decision.matchedPolicies,
      appliedPolicy: decision.appliedPolicy,
      reason: decision.reason,
      timestamp: decision.timestamp,
      request: request ?? { subjectId: "unknown", resourceType: "unknown", resourceId: "unknown", action: "unknown" },
    };
    this.entries.unshift(entry);
    if (this.entries.length > MAX_ENTRIES) {
      this.entries.length = MAX_ENTRIES;
    }
    return entry;
  }

  getAll(): AuditEntry[] {
    return this.entries;
  }

  getRecent(limit: number): AuditEntry[] {
    return this.entries.slice(0, limit);
  }
}
