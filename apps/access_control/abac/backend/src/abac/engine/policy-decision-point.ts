import { Injectable } from "@nestjs/common";
import {
  AccessDecision,
  AccessRequest,
  AttributeCondition,
  PolicyMatch,
  PolicyMatchDetail,
} from "./policy.types";
import { PolicyStore } from "./policy-store";

@Injectable()
export class PolicyDecisionPoint {
  constructor(private readonly policyStore: PolicyStore) {}

  evaluate(request: AccessRequest): AccessDecision {
    const policies = this.policyStore
      .getAll()
      .filter((p) => p.enabled)
      .sort((a, b) => b.priority - a.priority);

    const matchedPolicies: PolicyMatch[] = [];
    let appliedPolicy = null;
    let allowed = false;
    let reason = "No matching policy found. Default deny.";

    for (const policy of policies) {
      const details: PolicyMatchDetail[] = [];
      let matched = true;

      const groups: Array<{ group: string; conditions: AttributeCondition[] | undefined; context: Record<string, any> }> = [
        { group: "subject", conditions: policy.rules.subject, context: request.subject },
        { group: "resource", conditions: policy.rules.resource, context: request.resource },
        { group: "action", conditions: policy.rules.action, context: request.action },
        { group: "environment", conditions: policy.rules.environment, context: request.environment },
      ];

      for (const { group, conditions, context } of groups) {
        if (!conditions || conditions.length === 0) continue;

        for (const condition of conditions) {
          // Support dynamic references like "${subject.userId}"
          let expectedValue = condition.value;
          if (typeof expectedValue === "string" && expectedValue.startsWith("${") && expectedValue.endsWith("}")) {
            const ref = expectedValue.slice(2, -1);
            const [refGroup, refAttr] = ref.split(".");
            const contextMap: Record<string, Record<string, any>> = {
              subject: request.subject,
              resource: request.resource,
              action: request.action,
              environment: request.environment,
            };
            const refContext = contextMap[refGroup];
            expectedValue = refContext ? refContext[refAttr] : undefined;
          }

          const actualValue = context[condition.attribute];
          const result = this.evaluateCondition(condition.operator, actualValue, expectedValue);

          details.push({
            group,
            attribute: condition.attribute,
            operator: condition.operator,
            expected: expectedValue,
            actual: actualValue,
            result,
          });

          if (!result) {
            matched = false;
          }
        }
      }

      matchedPolicies.push({ policy, matched, details });

      if (matched && appliedPolicy === null) {
        appliedPolicy = policy;
        allowed = policy.effect === "allow";
        reason = policy.effect === "allow"
          ? `Allowed by policy: ${policy.name}`
          : `Denied by policy: ${policy.name}`;
      }
    }

    return {
      allowed,
      matchedPolicies,
      appliedPolicy,
      reason,
      timestamp: new Date().toISOString(),
    };
  }

  private evaluateCondition(
    operator: AttributeCondition["operator"],
    actual: any,
    expected: any,
  ): boolean {
    switch (operator) {
      case "eq":
        return actual === expected;
      case "neq":
        return actual !== expected;
      case "gt":
        return actual > expected;
      case "gte":
        return actual >= expected;
      case "lt":
        return actual < expected;
      case "lte":
        return actual <= expected;
      case "in":
        return Array.isArray(expected) ? expected.includes(actual) : false;
      case "contains":
        if (typeof actual === "string") return actual.includes(String(expected));
        if (Array.isArray(actual)) return actual.includes(expected);
        return false;
      default:
        return false;
    }
  }
}
