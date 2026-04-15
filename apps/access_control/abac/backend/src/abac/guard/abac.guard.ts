import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CHECK_ACCESS_KEY, CheckAccessOptions } from "./check-access.decorator";
import { PolicyDecisionPoint } from "../engine/policy-decision-point";
import { AccessRequest } from "../engine/policy.types";

@Injectable()
export class AbacGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly pdp: PolicyDecisionPoint,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.get<CheckAccessOptions>(
      CHECK_ACCESS_KEY,
      context.getHandler(),
    );

    if (!options) return true;

    const request = context.switchToHttp().getRequest();
    const userId = request.headers["x-user-id"] as string | undefined;

    // UserService is attached to request by UserInterceptor or resolved here
    const userService = request.userService;
    let subjectAttrs: Record<string, any>;

    if (userId && userService) {
      const user = userService.findById(userId);
      subjectAttrs = user
        ? { userId: user.id, role: user.role, department: user.department, trustLevel: user.trustLevel }
        : { userId, role: "anonymous", trustLevel: 0 };
    } else {
      subjectAttrs = { userId: userId ?? "anonymous", role: "anonymous", trustLevel: 0 };
    }

    const now = new Date();
    const environmentAttrs: Record<string, any> = {
      ipAddress: request.ip ?? "127.0.0.1",
      currentTime: now.toISOString(),
      currentHour: now.getHours(),
      isTrustedNetwork: request.headers["x-trusted-network"] === "true",
    };

    // Resource attributes: use pre-populated resolvedResource, or fall back to type only
    const resourceAttrs: Record<string, any> = {
      resourceType: options.resourceType,
      ...(request.resolvedResource ?? {}),
    };

    const actionAttrs: Record<string, any> = {
      type: options.action,
    };

    const accessRequest: AccessRequest = {
      subject: subjectAttrs,
      resource: resourceAttrs,
      action: actionAttrs,
      environment: environmentAttrs,
    };

    const decision = this.pdp.evaluate(accessRequest);
    request.abacDecision = decision;
    request.abacCheckInput = {
      subjectId: subjectAttrs.userId,
      resourceType: options.resourceType,
      resourceId: resourceAttrs.resourceId ?? request.params?.id ?? "unknown",
      action: options.action,
    };

    if (!decision.allowed) {
      throw new ForbiddenException(decision.reason);
    }

    return true;
  }
}
