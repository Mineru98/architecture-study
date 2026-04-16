import { Injectable } from '@nestjs/common';

// Delegation: temporary permission delegation
// Delegator grants subset of permissions to delegatee with expiry

interface Delegation {
  id: string;
  delegatorId: string;
  delegateeId: string;
  permissions: string[];
  expiresAt: Date;
  createdAt: Date;
}

const BASE_ROLE_PERMISSIONS: Record<string, string[]> = {
  customer: ['product.read', 'order.create', 'order.read:own'],
  seller: ['product.read', 'product.create', 'product.update', 'order.read', 'order.update:status'],
  'cs-agent': ['product.read', 'order.read', 'order.update:status'],
  admin: ['product.read', 'product.create', 'product.update', 'product.delete', 'order.read', 'order.update:status', 'user.read'],
};

// Active delegations (in production, stored in DB)
const delegations: Delegation[] = [
  {
    id: 'd1',
    delegatorId: 'u4', // admin delegates to cs-agent
    delegateeId: 'u3',
    permissions: ['product.update', 'order.cancel'],
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h from now
    createdAt: new Date(),
  },
];

@Injectable()
export class PermissionService {
  private readonly delegations = delegations;

  /** Get base permissions from role */
  getBasePermissions(role: string): string[] {
    return BASE_ROLE_PERMISSIONS[role] || [];
  }

  /** Get active delegations for a user */
  getActiveDelegations(userId: string): Delegation[] {
    return this.delegations.filter(
      (d) => d.delegateeId === userId && new Date() < d.expiresAt,
    );
  }

  /** Get effective permissions: base + delegated */
  getEffectivePermissions(userId: string, role: string): string[] {
    const base = this.getBasePermissions(role);
    const delegated = this.getActiveDelegations(userId)
      .flatMap((d) => d.permissions);
    return [...new Set([...base, ...delegated])];
  }

  /** Create a new delegation */
  delegate(delegatorId: string, delegateeId: string, permissions: string[], durationMs: number): Delegation {
    const delegation: Delegation = {
      id: `d-${Date.now()}`,
      delegatorId,
      delegateeId,
      permissions,
      expiresAt: new Date(Date.now() + durationMs),
      createdAt: new Date(),
    };
    this.delegations.push(delegation);
    return delegation;
  }

  /** Revoke a delegation */
  revoke(delegationId: string): boolean {
    const idx = this.delegations.findIndex((d) => d.id === delegationId);
    if (idx >= 0) {
      this.delegations.splice(idx, 1);
      return true;
    }
    return false;
  }

  hasPermission(userId: string, role: string, permission: string): boolean {
    const perms = this.getEffectivePermissions(userId, role);
    return perms.includes(permission) || perms.includes(permission.split(':')[0]);
  }
}
