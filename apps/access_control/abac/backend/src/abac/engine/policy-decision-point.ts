/**
 * PDP (Policy Decision Point)
 * 정책 매칭 -> 조건 평가 -> 접근 결정
 */

import type {
  Policy,
  Condition,
  EvaluationContext,
  DecisionResult,
  ConditionOperator
} from "./policy.types.js";
import { policyStore } from "./policy-store.js";

// ============================================================================
// 속성 값 추출
// ============================================================================

/**
 * 속성 경로로 값 추출 (직접 프로퍼티 접근)
 * 예: "subject.role", "resource.value", "environment.hour"
 */
function getAttributeValue(context: EvaluationContext, path: string): unknown {
  const parts = path.split(".");
  if (parts.length < 2) return undefined;

  const category = parts[0];
  const key = parts.slice(1).join(".");

  switch (category) {
    case "subject":
      return (context.subject as unknown as Record<string, unknown>)[key];
    case "resource":
      return (context.resource as unknown as Record<string, unknown>)[key];
    case "action":
      return (context.action as unknown as Record<string, unknown>)[key];
    case "environment":
      return (context.environment as unknown as Record<string, unknown>)[key];
    default:
      return undefined;
  }
}

/**
 * 동적 속성 참조 해결
 * ${subject.xxx}, ${resource.xxx}, ${environment.xxx} 패턴을 실제 값으로 치환
 */
function resolveDynamicValue(value: unknown, context: EvaluationContext): unknown {
  if (typeof value !== "string") return value;

  // ${subject.xxx}, ${resource.xxx}, ${environment.xxx} 패턴 매칭
  const dynamicPattern = /^\$\{([^}]+)\}$/;
  const match = String(value).match(dynamicPattern);

  if (!match) return value;

  const path = match[1]; // e.g., "resource.ownerId"
  return getAttributeValue(context, path);
}

// ============================================================================
// 조건 평가
// ============================================================================

/**
 * 단일 조건 평가
 * 조건의 속성 값이 연산자를 만족하면 true
 */
function evaluateCondition(condition: Condition, context: EvaluationContext): boolean {
  const actualValue = getAttributeValue(context, condition.attribute);

  // 속성 누락 시 false (기본 거부)
  if (actualValue === undefined || actualValue === null) {
    return false;
  }

  const expectedValue = resolveDynamicValue(condition.value, context);

  return evaluateOperator(condition.operator, actualValue, expectedValue);
}

/**
 * 연산자별 비교 로직
 */
function evaluateOperator(
  operator: ConditionOperator,
  actual: unknown,
  expected: unknown
): boolean {
  switch (operator) {
    case "eq":
      return actual === expected;

    case "neq":
      return actual !== expected;

    case "gt":
      return typeof actual === "number" && typeof expected === "number" && actual > expected;

    case "gte":
      return typeof actual === "number" && typeof expected === "number" && actual >= expected;

    case "lt":
      return typeof actual === "number" && typeof expected === "number" && actual < expected;

    case "lte":
      return typeof actual === "number" && typeof expected === "number" && actual <= expected;

    case "in":
      return Array.isArray(expected) && expected.includes(actual);

    case "contains":
      return typeof actual === "string" && typeof expected === "string" &&
        actual.includes(expected);

    default:
      return false;
  }
}

// ============================================================================
// PDP (Policy Decision Point)
// ============================================================================

/**
 * 접근 평가 메인 함수
 * 우선순위 높은 정책부터 첫 번째 매칭 정책을 적용 (first-match-wins)
 */
export function evaluate(context: EvaluationContext): DecisionResult {
  const startTime = performance.now();
  const policies = policyStore.getAllPolicies();

  // 우선순위 내림차순으로 정렬된 정책 순회
  for (const policy of policies) {
    // 모든 조건이 만족되어야 매칭
    const allMatch = policy.conditions.every(condition =>
      evaluateCondition(condition, context)
    );

    if (allMatch) {
      const elapsed = performance.now() - startTime;
      return {
        decision: policy.effect,
        reason: `Policy '${policy.name}' matched (priority: ${policy.priority})`,
        matchedPolicy: policy,
        evaluatedAt: new Date().toISOString(),
        processingTimeMs: Math.round(elapsed),
        cached: false,
      };
    }
  }

  // 매칭되는 정책 없음 -> 기본 거부
  const elapsed = performance.now() - startTime;
  return {
    decision: "deny",
    reason: "No matching policy found. Default deny.",
    evaluatedAt: new Date().toISOString(),
    processingTimeMs: Math.round(elapsed),
    cached: false,
  };
}

/**
 * 복수 정책 일치 여부 확인 (디버깅/테스트용)
 */
export function evaluateWithDebug(context: EvaluationContext): {
  result: DecisionResult;
  triedPolicies: Array<{ policy: Policy; matched: boolean; reason?: string }>;
} {
  const startTime = performance.now();
  const policies = policyStore.getAllPolicies();
  const triedPolicies: Array<{ policy: Policy; matched: boolean; reason?: string }> = [];

  for (const policy of policies) {
    const allMatch = policy.conditions.every(condition =>
      evaluateCondition(condition, context)
    );

    triedPolicies.push({
      policy,
      matched: allMatch,
      reason: allMatch ? `Matched (priority: ${policy.priority})` : undefined,
    });

    if (allMatch) {
      const elapsed = performance.now() - startTime;
      return {
        result: {
          decision: policy.effect,
          reason: `Policy '${policy.name}' matched (priority: ${policy.priority})`,
          matchedPolicy: policy,
          evaluatedAt: new Date().toISOString(),
          processingTimeMs: Math.round(elapsed),
          cached: false,
        },
        triedPolicies,
      };
    }
  }

  const elapsed = performance.now() - startTime;
  return {
    result: {
      decision: "deny",
      reason: "No matching policy found. Default deny.",
      evaluatedAt: new Date().toISOString(),
      processingTimeMs: Math.round(elapsed),
      cached: false,
    },
    triedPolicies,
  };
}