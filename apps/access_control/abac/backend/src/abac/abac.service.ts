/**
 * ABAC 서비스 (PIP - Policy Information Point)
 * 속성 조회 및 조립 로직
 */

import type {
  SubjectAttributes,
  ResourceAttributes,
  EnvironmentAttributes,
  ActionAttributes
} from "./attribute/attribute.types.js";

/**
 * PIP 서비스
 * 요청에서 ABAC 속성을 수집/조립
 */
export class AbacService {
  /**
   * Subject 속성 조회
   * 사용자 ID로 추가 속성 조회 가능 (DB/캐시)
   */
  async getSubjectAttributes(userId: string, role: string, trustLevel?: number, ownerId?: string): Promise<SubjectAttributes> {
    return {
      userId,
      role: role as "admin" | "seller" | "customer",
      trustLevel: trustLevel ?? 1,
      ownerId,
    };
  }

  /**
   * Resource 속성 조회
   * 리소스 ID로 상세 정보 조회 가능 (DB/캐시)
   */
  async getResourceAttributes(
    resourceType: string,
    resourceId: string,
    ownerId?: string,
    value?: number
  ): Promise<ResourceAttributes> {
    return {
      resourceType: resourceType as "user" | "product" | "refund",
      resourceId,
      ownerId: ownerId ?? "",
      value,
    };
  }

  /**
   * Environment 속성 생성
   */
  getEnvironmentAttributes(
    ipAddress: string,
    isTrustedNetwork: boolean,
    hour?: number
  ): EnvironmentAttributes {
    return {
      timestamp: new Date(),
      hour: hour ?? new Date().getHours(),
      ipAddress,
      isTrustedNetwork,
    };
  }

  /**
   * Action 속성 생성
   */
  getActionAttributes(action: string): ActionAttributes {
    return {
      action: action as "read" | "create" | "update" | "delete" | "refund",
    };
  }
}