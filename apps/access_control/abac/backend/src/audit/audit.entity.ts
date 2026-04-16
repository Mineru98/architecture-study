/**
 * 감사 로그 엔티티
 * 모든 접근 평가 결과 기록
 */

export interface AuditLog {
  id: string;
  userId: string;
  resourceType: string;
  resourceId: string;
  action: string;
  decision: "allow" | "deny";
  reason: string;
  ipAddress: string;
  timestamp: Date;
  processingTimeMs: number;
  matchedPolicyId?: string;
}

// 인메모리 감사 로그 스토어 (최대 50건)
const auditLogs: AuditLog[] = [];

export const auditStore = {
  findAll: (limit = 50) => auditLogs.slice(-limit),
  add: (log: Omit<AuditLog, "id" | "timestamp">) => {
    const entry: AuditLog = {
      id: `audit-${Date.now()}`,
      timestamp: new Date(),
      ...log,
    };
    auditLogs.push(entry);
    // 최대 50건 유지
    if (auditLogs.length > 50) {
      auditLogs.shift();
    }
    return entry;
  },
};