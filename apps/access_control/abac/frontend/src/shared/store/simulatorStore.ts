import { create } from 'zustand';
import type { ActionType, EnvironmentConfig } from '../types/abac';

interface SimulatorState {
  selectedUserId: string;
  selectedResourceType: 'product' | 'refund';
  selectedResourceId: string;
  selectedAction: ActionType;
  environment: EnvironmentConfig;
  setSelectedUserId: (id: string) => void;
  setSelectedResourceType: (type: 'product' | 'refund') => void;
  setSelectedResourceId: (id: string) => void;
  setSelectedAction: (action: ActionType) => void;
  setEnvironment: (env: Partial<EnvironmentConfig>) => void;
  resetEnvironment: () => void;
}

const defaultEnv: EnvironmentConfig = {
  ipAddress: '192.168.1.100',
  currentHour: new Date().getHours(),
  isTrustedNetwork: false,
};

export const useSimulatorStore = create<SimulatorState>((set) => ({
  selectedUserId: '',
  selectedResourceType: 'product',
  selectedResourceId: '',
  selectedAction: 'read',
  environment: { ...defaultEnv },
  setSelectedUserId: (id) => set({ selectedUserId: id }),
  setSelectedResourceType: (type) => set({ selectedResourceType: type, selectedResourceId: '' }),
  setSelectedResourceId: (id) => set({ selectedResourceId: id }),
  setSelectedAction: (action) => set({ selectedAction: action }),
  setEnvironment: (env) => set((s) => ({ environment: { ...s.environment, ...env } })),
  resetEnvironment: () => set({ environment: { ...defaultEnv } }),
}));
