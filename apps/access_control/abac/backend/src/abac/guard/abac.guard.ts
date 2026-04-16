/**
 * ABAC Guard (PEP - Policy Enforcement Point)
 * NestJS Guard로 구현, @CheckAccess 데코레이터와 연동
 */

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { Request } from "express";

import { evaluate } from "../engine/policy-decision-point.js";
import { policyStore } from "../engine/policy-store.js";
import type { EvaluationContext } from "../engine/policy.types.js";

/** 요청에서 추출할 Subject 정보 */
interface RequestSubject {
  userId: string;
  role: string;
  trustLevel?: number;
  ownerId?: string;
}

/** 요청에서 추출할 리소스 정보 */
interface RequestResource {
  type: string;
  id: string;
  ownerId?: string;
  value?: number;
}

/** 요청에서 추출할 액션 */
interface RequestAction {
  action: string;
}

/**
 * ABAC Guard
 * 요청의 속성 정보를 수집하여 PDP로 접근 평가
 */
@Injectable()
export class AbacGuard implements CanActivate {
  /**
   * 접근 결정 실행
   * - 요청에서 속성 정보 추출
   * - PDP 호출하여 평가
   * - deny인 경우 403 예외 발생
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Policy Store 초기화 확인
    if (!policyStore.isInitialized()) {
      policyStore.initialize();
    }

    // 요청에서 속성 정보 추출
    const evaluationContext = this.buildEvaluationContext(request);

    // PDP 호출하여 접근 평가
    const result = evaluate(evaluationContext);

    // 요청 객체에 평가 결과 저장 (후속 처리/로깅용)
    (request as any).abacDecision = result;

    if (result.decision === "deny") {
      throw new HttpException(
        {
          statusCode: HttpStatus.FORBIDDEN,
          message: "Access denied",
          reason: result.reason,
        },
        HttpStatus.FORBIDDEN
      );
    }

    return true;
  }

  /**
   * 요청 객체에서 ABAC 속성 정보 추출
   * Middleware에서 미리 설정된 속성을 사용하거나 기본값 적용
   */
  private buildEvaluationContext(request: Request): EvaluationContext {
    // Middleware에서 설정된 속성이 있으면 사용
    const reqAttributes = (request as any).abacAttributes || {};

    // Subject 추출
    const subject = {
      userId: reqAttributes.subject?.userId || this.extractSubjectFromHeader(request).userId,
      role: reqAttributes.subject?.role || this.extractSubjectFromHeader(request).role,
      trustLevel: reqAttributes.subject?.trustLevel ?? 1,
      ownerId: reqAttributes.subject?.ownerId,
    };

    // Resource 추출
    const resource = {
      resourceType: reqAttributes.resource?.type || this.inferResourceType(request),
      resourceId: reqAttributes.resource?.id || this.extractResourceId(request),
      ownerId: reqAttributes.resource?.ownerId || "",
      value: reqAttributes.resource?.value,
    };

    // Action 추출
    const action = {
      action: reqAttributes.action?.action || this.inferAction(request),
    };

    // Environment 추출
    const environment = {
      timestamp: new Date(),
      hour: new Date().getHours(),
      ipAddress: this.extractIpAddress(request),
      isTrustedNetwork: this.isTrustedNetwork(request),
    };

    return { subject, resource, action, environment };
  }

  /** 헤더에서 Subject 정보 추출 (간소화 구현) */
  private extractSubjectFromHeader(request: Request): RequestSubject {
    const userId = request.headers["x-user-id"] as string || "anonymous";
    const role = request.headers["x-user-role"] as string || "customer";
    const trustLevel = parseInt(request.headers["x-trust-level"] as string || "1", 10);
    const ownerId = request.headers["x-owner-id"] as string;

    return { userId, role, trustLevel, ownerId };
  }

  /** 요청 URL에서 리소스 ID 추출 */
  private extractResourceId(request: Request): string {
    const match = request.url.match(/\/(\w+)\/([^\/]+)/);
    return match ? match[2] : "";
  }

  /** 요청 메서드에서 리소스 타입 추론 */
  private inferResourceType(request: Request): string {
    if (request.url.includes("/products")) return "product";
    if (request.url.includes("/refunds")) return "refund";
    if (request.url.includes("/users")) return "user";
    return "unknown";
  }

  /** 요청 메서드에서 액션 추론 */
  private inferAction(request: Request): string {
    switch (request.method) {
      case "GET": return "read";
      case "POST": return "create";
      case "PUT": return "update";
      case "DELETE": return "delete";
      default: return "read";
    }
  }

  /** 클라이언트 IP 추출 (X-Forwarded-For 지원) */
  private extractIpAddress(request: Request): string {
    const forwarded = request.headers["x-forwarded-for"];
    if (forwarded) {
      return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0];
    }
    return request.socket?.remoteAddress || "127.0.0.1";
  }

  /** 신뢰할 수 있는 내부 네트워크인지 판단 */
  private isTrustedNetwork(request: Request): boolean {
    const ip = this.extractIpAddress(request);
    return (
      ip.startsWith("10.") ||
      ip.startsWith("192.168.") ||
      ip.startsWith("127.") ||
      ip === "::1" ||
      ip === "::ffff:127.0.0.1"
    );
  }
}