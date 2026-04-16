import { Injectable } from '@nestjs/common';
import { PolicyStore } from './policy-store';
import { Condition, DecisionResult, EvaluationContext } from './policy.types';

@Injectable()
export class PolicyDecisionPoint {
  constructor(private readonly policyStore: PolicyStore) {}

  evaluate(context: EvaluationContext): DecisionResult {
    for (const policy of this.policyStore.getPolicies()) {
      if (policy.conditions.every((condition) => this.matches(condition, context))) {
        return {
          allowed: policy.effect === 'allow',
          reason: `${policy.effect.toUpperCase()}: ${policy.name}`,
          matchedPolicy: policy,
        };
      }
    }

    return {
      allowed: false,
      reason: 'DENY: no matching policy',
    };
  }

  private matches(condition: Condition, context: EvaluationContext): boolean {
    const left = this.resolveValue(condition.field, context);
    const right = this.resolveExpectedValue(condition.value, context);

    switch (condition.operator) {
      case 'eq':
        return left === right;
      case 'neq':
        return left !== right;
      case 'gt':
        return this.asNumber(left) > this.asNumber(right);
      case 'gte':
        return this.asNumber(left) >= this.asNumber(right);
      case 'lt':
        return this.asNumber(left) < this.asNumber(right);
      case 'lte':
        return this.asNumber(left) <= this.asNumber(right);
      case 'in':
        return Array.isArray(right) && right.includes(left);
      case 'contains':
        if (Array.isArray(left)) {
          return left.includes(right);
        }
        if (typeof left === 'string' && typeof right === 'string') {
          return left.includes(right);
        }
        return false;
      default:
        return false;
    }
  }

  private resolveExpectedValue(value: unknown, context: EvaluationContext): unknown {
    if (typeof value !== 'string') {
      return value;
    }

    const match = value.match(/^\$\{(.+)\}$/);
    if (!match) {
      return value;
    }

    return this.resolvePath(context, match[1]);
  }

  private resolveValue(path: string, context: EvaluationContext): unknown {
    return this.resolvePath(context, path);
  }

  private resolvePath(source: unknown, path: string): unknown {
    return path.split('.').reduce<unknown>((value, segment) => {
      if (value === null || value === undefined || typeof value !== 'object') {
        return undefined;
      }
      return (value as Record<string, unknown>)[segment];
    }, source);
  }

  private asNumber(value: unknown): number {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string' && value.trim() !== '') {
      return Number(value);
    }
    return Number.NaN;
  }
}
