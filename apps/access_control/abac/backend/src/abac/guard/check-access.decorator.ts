import { SetMetadata } from "@nestjs/common";

export const CHECK_ACCESS_KEY = "abac:check-access";

export interface CheckAccessOptions {
  resourceType: string;
  action: string;
}

export const CheckAccess = (options: CheckAccessOptions) =>
  SetMetadata(CHECK_ACCESS_KEY, options);
