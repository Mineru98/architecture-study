import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AbacService } from './abac.service';
import { EvaluationContext } from './policy.types';

@Injectable()
export class AbacGuard implements CanActivate {
  constructor(
    private readonly abacService: AbacService,
    private readonly jwt: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const className = context.getClass().name;
    if (className === 'AuthController' || className === 'AbacController') {
      return true;
    }

    const subject = this.buildSubject(request);
    const action = this.resolveAction(request);
    const resource = this.buildResource(request, action, context.getClass().name);
    const environment = this.buildEnvironment(request);

    request.user = subject;

    const decision = this.abacService.evaluate({
      subject,
      resource,
      action,
      environment,
    } satisfies EvaluationContext);

    if (!decision.allowed) {
      throw new ForbiddenException(`Access denied (ABAC): ${decision.reason}`);
    }

    return true;
  }

  private buildSubject(request: Record<string, unknown>): Record<string, unknown> {
    const token = this.extractToken(request.headers as Record<string, string | string[] | undefined>);
    if (!token) {
      return { id: 'anonymous', role: 'anonymous', trustLevel: 0 };
    }

    try {
      const payload = this.jwt.verify<Record<string, unknown>>(token);
      const trustLevelHeader = this.readHeader(request, 'x-trust-level');
      return {
        ...payload,
        id: payload.sub,
        trustLevel: trustLevelHeader ? Number(trustLevelHeader) : this.defaultTrustLevel(payload.role),
      };
    } catch {
      return { id: 'anonymous', role: 'anonymous', trustLevel: 0 };
    }
  }

  private resolveAction(request: Record<string, unknown>): string {
    const method = String(request.method || '').toUpperCase();
    const actionMap: Record<string, string> = {
      GET: 'read',
      POST: 'create',
      PUT: 'update',
      PATCH: 'update',
      DELETE: 'delete',
    };

    const route = (request.route || {}) as Record<string, unknown>;
    const path = String(route.path || request.path || '');
    const body = (request.body || {}) as Record<string, unknown>;
    const items = Array.isArray(body.items) ? body.items : [];

    if (method === 'POST' && path.includes('orders') && items.length > 0) {
      return 'refund';
    }

    return actionMap[method] || 'read';
  }

  private buildResource(request: Record<string, unknown>, action: string, controllerName: string): Record<string, unknown> {
    const params = (request.params || {}) as Record<string, unknown>;
    const query = (request.query || {}) as Record<string, unknown>;
    const body = (request.body || {}) as Record<string, unknown>;
    const items = Array.isArray(body.items) ? body.items : [];
    const amount = body.amount !== undefined ? Number(body.amount) : items.reduce((sum, item) => {
      if (typeof item !== 'object' || item === null) {
        return sum;
      }
      const entry = item as Record<string, unknown>;
      return sum + Number(entry.price || 0) * Number(entry.quantity || 0);
    }, 0);

    return {
      ...query,
      ...params,
      ...body,
      controller: controllerName,
      resourceType: controllerName.replace('Controller', '').toLowerCase(),
      amount,
      orderId: params.id,
      ownerId: body.ownerId ?? query.ownerId ?? params.ownerId,
      action,
    };
  }

  private buildEnvironment(request: Record<string, unknown>): Record<string, unknown> {
    return {
      hour: new Date().getHours(),
      trustedNetwork: this.parseBooleanHeader(this.readHeader(request, 'x-trusted-network')),
      userAgent: this.readHeader(request, 'user-agent') || '',
      ip: request.ip || '',
    };
  }

  private extractToken(headers: Record<string, string | string[] | undefined>): string | undefined {
    const auth = headers.authorization;
    const value = Array.isArray(auth) ? auth[0] : auth;
    return value?.replace('Bearer ', '');
  }

  private readHeader(request: Record<string, unknown>, name: string): string | undefined {
    const headers = (request.headers || {}) as Record<string, string | string[] | undefined>;
    const value = headers[name];
    return Array.isArray(value) ? value[0] : value;
  }

  private parseBooleanHeader(value?: string): boolean {
    return value === 'true' || value === '1' || value === 'yes';
  }

  private defaultTrustLevel(role: unknown): number {
    if (role === 'admin') return 5;
    if (role === 'cs-agent') return 3;
    if (role === 'seller') return 2;
    if (role === 'customer') return 1;
    return 0;
  }
}
