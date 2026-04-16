import { Injectable } from '@nestjs/common';
import { PolicyDecisionPoint } from './policy-decision-point';
import { PolicyStore } from './policy-store';
import { AuditEntry, DecisionResult, EvaluationContext, Policy } from './policy.types';

@Injectable()
export class AbacService {
  private readonly auditLog: AuditEntry[] = [];

  constructor(
    private readonly pdp: PolicyDecisionPoint,
    private readonly policyStore: PolicyStore,
  ) {}

  evaluate(context: EvaluationContext): DecisionResult {
    const result = this.pdp.evaluate(context);

    this.auditLog.push({
      timestamp: new Date(),
      subject: { ...context.subject },
      resource: { ...context.resource },
      action: context.action,
      environment: { ...context.environment },
      result,
    });

    return result;
  }

  getAuditLog(subjectId?: string): AuditEntry[] {
    if (!subjectId) {
      return [...this.auditLog];
    }
    return this.auditLog.filter((entry) => entry.subject.id === subjectId);
  }

  getPolicies(): Policy[] {
    return this.policyStore.getPolicies();
  }
}
