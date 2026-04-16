/**
 * 리소스 속성 미들웨어 (PIP)
 * 요청에서 리소스 속성을 사전 조회하여 Guard에 전달
 */

import type { Request, Response, NextFunction } from "express";

/**
 * 리소스 속성 사전 조회 미들웨어
 * 후속 Guard에서 사용할 수 있도록 요청 객체에 속성 설정
 */
export function resourceAttributeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // 요청 URL에서 리소스 정보 추출
  const pathParts = req.path.split("/").filter(Boolean);
  // path: /api/products/prod-1 -> ["api", "products", "prod-1"]

  if (pathParts.length >= 3) {
    const [, resourceType, resourceId] = pathParts;

    // abacAttributes에 resource 정보 설정
    (req as any).abacAttributes = {
      ...(req as any).abacAttributes,
      resource: {
        type: resourceType.replace("api/", ""),
        id: resourceId,
      },
    };
  }

  // 헤더에서 Subject 정보 추출
  const subject = {
    userId: req.headers["x-user-id"] as string || "anonymous",
    role: req.headers["x-user-role"] as string || "customer",
    trustLevel: parseInt(req.headers["x-trust-level"] as string || "1", 10),
    ownerId: req.headers["x-owner-id"] as string,
  };

  (req as any).abacAttributes = {
    ...(req as any).abacAttributes,
    subject,
  };

  // 헤더에서 전달된 리소스 값 (환불 금액 등)
  const resourceValue = req.headers["x-resource-value"];
  if (resourceValue) {
    (req as any).abacAttributes = {
      ...(req as any).abacAttributes,
      resource: {
        ...(req as any).abacAttributes?.resource,
        value: parseInt(resourceValue as string, 10),
      },
    };
  }

  next();
}