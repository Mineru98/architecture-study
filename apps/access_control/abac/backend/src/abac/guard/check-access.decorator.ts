/**
 * @CheckAccess 데코레이터
 * 엔드포인트에 ABAC 접근 제어를 적용
 *
 * 사용법:
 * @CheckAccess("update", "product")
 * @Put(":id")
 * async updateProduct(...) {}
 */

import { SetMetadata } from "@nestjs/common";

/** 데코레이터 키 */
export const CHECK_ACCESS_KEY = "check_access";

/** @CheckAccess 메타데이터 */
export interface CheckAccessOptions {
  action: string;      // "read" | "create" | "update" | "delete" | "refund"
  resourceType: string; // "user" | "product" | "refund"
}

/**
 * @CheckAccess 데코레이터
 * 액션과 리소스 타입을 지정하여 ABAC 가드 적용
 */
export const CheckAccess = (action: string, resourceType: string) =>
  SetMetadata(CHECK_ACCESS_KEY, { action, resourceType });