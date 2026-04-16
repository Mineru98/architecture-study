/**
 * 감사 로그 서비스
 * 모든 접근 평가 결과를 기록
 */

import { auditStore, type AuditLog } from "./audit.entity.js";
import type { DecisionResult } from "../abac/engine/policy.types.js";

export class AuditService {
  /**
   * 접근 평가 결과 기록
   */
  logAccessCheck(params: {
    userId: string;
    resourceType: string;
    resourceId: string;
    action: string;
    decision: DecisionResult;
    ipAddress: string;
  }): AuditLog {
    return auditStore.add({
      userId: params.userId,
      resourceType: params.resourceType,
      resourceId: params.resourceId,
      action: params.action,
      decision: params.decision.decision,
      reason: params.decision.reason,
      ipAddress: params.ipAddress,
      processingTimeMs: params.decision.processingTimeMs,
      matchedPolicyId: params.decision.matchedPolicy?.id,
    });
  }

  /**
   * 감사 로그 조회
   */
  findAll(limit = 50): AuditLog[] {
    return auditStore.findAll(limit);
  }
}