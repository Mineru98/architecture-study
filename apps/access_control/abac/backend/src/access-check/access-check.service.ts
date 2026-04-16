/**
 * 접근 평가 시뮬레이션 서비스
 */

import { evaluate } from "../abac/engine/policy-decision-point.js";
import { policyStore } from "../abac/engine/policy-store.js";
import type { EvaluationContext, DecisionResult } from "../abac/engine/policy.types.js";

export class AccessCheckService {
  /**
   * 접근 평가 실행
   */
  evaluate(context: EvaluationContext): DecisionResult {
    const result = evaluate(context);

    // 감사 로그 기록 (동적으로 AuditService 조회 - 순환 참조 방지)
    try {
      const { AuditService } = require("../audit/audit.service.js");
      const auditService = new AuditService();
      auditService.logAccessCheck({
        userId: context.subject.userId,
        resourceType: context.resource.resourceType,
        resourceId: context.resource.resourceId,
        action: context.action.action,
        decision: result,
        ipAddress: context.environment.ipAddress,
      });
    } catch (e) {
      // 감사 로그 실패해도 접근 평가는 계속 진행
      console.error("[AccessCheckService] Audit log failed:", e);
    }

    return result;
  }

  /**
   * 정책 목록 조회
   */
  getPolicies() {
    return policyStore.getAllPolicies();
  }
}