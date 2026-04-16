import { Injectable } from '@nestjs/common';

// Flat ABAC: attribute-based rules without hierarchy
interface ABACRule {
  name: string;
  subjectAttrs: Record<string, any>;
  resourceAttrs?: Record<string, any>;
  action: string;
  environment?: (env: Record<string, any>) => boolean;
  allow: boolean;
}

const RULES: ABACRule[] = [
  // Product rules
  { name: 'anyone-read-product', subjectAttrs: {}, action: 'product.read', allow: true },
  { name: 'seller-create-product', subjectAttrs: { role: 'seller' }, action: 'product.create', allow: true },
  { name: 'seller-update-product', subjectAttrs: { role: 'seller' }, action: 'product.update', allow: true },
  { name: 'admin-create-product', subjectAttrs: { role: 'admin' }, action: 'product.create', allow: true },
  { name: 'admin-update-product', subjectAttrs: { role: 'admin' }, action: 'product.update', allow: true },
  { name: 'admin-delete-product', subjectAttrs: { role: 'admin' }, action: 'product.delete', allow: true },
  // Order rules
  { name: 'customer-create-order', subjectAttrs: { role: 'customer' }, action: 'order.create', allow: true },
  { name: 'customer-read-own-order', subjectAttrs: { role: 'customer' }, action: 'order.read', allow: true },
  { name: 'seller-read-order', subjectAttrs: { role: 'seller' }, action: 'order.read', allow: true },
  { name: 'seller-update-order-status', subjectAttrs: { role: 'seller' }, action: 'order.update:status', allow: true },
  { name: 'cs-read-order', subjectAttrs: { role: 'cs-agent' }, action: 'order.read', allow: true },
  { name: 'cs-update-order-status', subjectAttrs: { role: 'cs-agent' }, action: 'order.update:status', allow: true },
  { name: 'admin-all-orders', subjectAttrs: { role: 'admin' }, action: 'order.read', allow: true },
  { name: 'admin-update-order', subjectAttrs: { role: 'admin' }, action: 'order.update:status', allow: true },
  // ABAC-specific: time-windowed access for cs-agents
  { name: 'cs-cancel-order-business-hours', subjectAttrs: { role: 'cs-agent' }, action: 'order.cancel',
    environment: (env) => { const h = new Date().getHours(); return h >= 9 && h < 18; }, allow: true },
];

@Injectable()
export class PermissionService {
  private readonly rules = RULES;

  checkAccess(subject: Record<string, any>, action: string, resource?: Record<string, any>, env?: Record<string, any>): boolean {
    const matchingRules = this.rules.filter((r) => {
      if (r.action !== action) return false;
      for (const [key, val] of Object.entries(r.subjectAttrs)) {
        if (subject[key] !== val) return false;
      }
      if (r.environment && !r.environment(env || {})) return false;
      return true;
    });

    // Deny by default, allow if any matching rule allows
    return matchingRules.some((r) => r.allow);
  }

  getRules(): ABACRule[] {
    return this.rules;
  }
}
