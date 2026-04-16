import { create } from 'zustand';
import type {
  Subject,
  Resource,
  Environment,
  AccessDecision,
} from '../types/abc';

interface SimulatorState {
  // 입력 속성
  subject: Subject;
  resource: Resource;
  action: string;
  environment: Environment;

  // 결과
  result: AccessDecision | null;
  isLoading: boolean;
  error: string | null;

  // 로그
  auditLogs: AuditLogItem[];

  // Actions
  setSubject: (subject: Partial<Subject>) => void;
  setResource: (resource: Partial<Resource>) => void;
  setAction: (action: string) => void;
  setEnvironment: (environment: Partial<Environment>) => void;
  setResult: (result: AccessDecision | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setAuditLogs: (logs: AuditLogItem[]) => void;
  reset: () => void;
}

interface AuditLogItem {
  id: string;
  userId: string;
  resourceType: string;
  resourceId: string;
  action: string;
  decision: 'allow' | 'deny';
  reason: string;
  ipAddress: string;
  timestamp: string;
  processingTimeMs: number;
}

const initialState = {
  subject: {
    userId: '',
    role: 'user' as const,
    trustLevel: 1,
  },
  resource: {
    type: 'product' as const,
    id: '',
    ownerId: '',
    amount: 0,
  },
  action: 'read',
  environment: {
    hour: new Date().getHours(),
    trustedNetwork: false,
  },
  result: null,
  isLoading: false,
  error: null,
  auditLogs: [],
};

export const useSimulatorStore = create<SimulatorState>((set) => ({
  ...initialState,

  setSubject: (subject) =>
    set((state) => ({
      subject: { ...state.subject, ...subject },
    })),

  setResource: (resource) =>
    set((state) => ({
      resource: { ...state.resource, ...resource },
    })),

  setAction: (action) => set({ action }),

  setEnvironment: (environment) =>
    set((state) => ({
      environment: { ...state.environment, ...environment },
    })),

  setResult: (result) => set({ result }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setAuditLogs: (auditLogs) => set({ auditLogs }),

  reset: () => set(initialState),
}));