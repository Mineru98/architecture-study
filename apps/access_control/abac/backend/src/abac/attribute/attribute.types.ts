export interface SubjectAttributes {
  userId: string;
  role: string;
  department?: string;
  trustLevel: number;
}

export interface ResourceAttributes {
  resourceType: string;
  resourceId: string;
  ownerId?: string;
  price?: number;
  amount?: number;
  category?: string;
}

export interface ActionAttributes {
  type: string; // 'read' | 'update' | 'delete' | 'refund'
}

export interface EnvironmentAttributes {
  ipAddress: string;
  currentTime: string;
  currentHour: number;
  isTrustedNetwork: boolean;
}
