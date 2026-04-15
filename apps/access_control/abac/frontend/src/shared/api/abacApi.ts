import axios from 'axios';
import type { User, Product, Refund, Policy, AccessCheckRequest, AccessDecision, AuditLogEntry } from '../types/abac';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4202/api',
  headers: { 'Content-Type': 'application/json' },
});

export const abacApi = {
  getUsers: () => api.get<User[]>('/users').then(r => r.data),
  getProducts: () => api.get<Product[]>('/products').then(r => r.data),
  getRefunds: () => api.get<Refund[]>('/refunds').then(r => r.data),
  getPolicies: () => api.get<Policy[]>('/policies').then(r => r.data),
  getAuditLog: () => api.get<AuditLogEntry[]>('/audit-log').then(r => r.data),
  checkAccess: (req: AccessCheckRequest) => api.post<AccessDecision>('/access-check', req).then(r => r.data),
};
