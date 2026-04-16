import { Injectable } from '@nestjs/common';
import { Policy } from './policy.types';

@Injectable()
export class PolicyStore {
  private readonly policies: Policy[] = [
    {
      id: 'admin-full-access',
      name: 'Admin Full Access',
      description: 'Admins can access all resources.',
      priority: 100,
      effect: 'allow',
      conditions: [{ field: 'subject.role', operator: 'eq', value: 'admin' }],
    },
    {
      id: 'high-value-refund-trusted-allow',
      name: 'High Value Refund Trusted Allow',
      description: 'Trusted high-level users can process high-value refunds from trusted networks.',
      priority: 91,
      effect: 'allow',
      conditions: [
        { field: 'action', operator: 'eq', value: 'refund' },
        { field: 'resource.amount', operator: 'gte', value: 100000 },
        { field: 'environment.trustedNetwork', operator: 'eq', value: true },
        { field: 'subject.trustLevel', operator: 'gte', value: 3 },
      ],
    },
    {
      id: 'high-value-refund-deny',
      name: 'High Value Refund Deny',
      description: 'Block high-value refunds unless a stronger allow rule matched first.',
      priority: 90,
      effect: 'deny',
      conditions: [
        { field: 'action', operator: 'eq', value: 'refund' },
        { field: 'resource.amount', operator: 'gte', value: 100000 },
      ],
    },
    {
      id: 'business-hours-only',
      name: 'Business Hours Only',
      description: 'Only allow updates and deletes during business hours.',
      priority: 85,
      effect: 'deny',
      conditions: [
        { field: 'action', operator: 'in', value: ['update', 'delete'] },
        { field: 'environment.hour', operator: 'in', value: [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19, 20, 21, 22, 23] },
      ],
    },
    {
      id: 'seller-own-product-update',
      name: 'Seller Own Product Update',
      description: 'Sellers can update their own products.',
      priority: 80,
      effect: 'allow',
      conditions: [
        { field: 'subject.role', operator: 'eq', value: 'seller' },
        { field: 'action', operator: 'eq', value: 'update' },
        { field: 'resource.ownerId', operator: 'eq', value: '${subject.id}' },
      ],
    },
    {
      id: 'default-refund-allow',
      name: 'Default Refund Allow',
      description: 'Allow lower-value refunds.',
      priority: 20,
      effect: 'allow',
      conditions: [
        { field: 'action', operator: 'eq', value: 'refund' },
        { field: 'resource.amount', operator: 'lt', value: 100000 },
      ],
    },
    {
      id: 'default-read-allow',
      name: 'Default Read Allow',
      description: 'Allow reads by default.',
      priority: 10,
      effect: 'allow',
      conditions: [{ field: 'action', operator: 'eq', value: 'read' }],
    },
  ] satisfies Policy[];

  getPolicies(): Policy[] {
    return [...this.policies];
  }
}
