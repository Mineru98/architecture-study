import axios from 'axios';
import type {
  AccessCheckRequest,
  AccessCheckResponse,
  AuditLogItem,
  Policy,
} from '../../shared/types/abc';

const api = axios.create({
  baseURL: '/api',
});

export const abacApi = {
  healthCheck: () => api.get('/health'),

  getUsers: () => api.get('/users'),

  getProducts: () => api.get('/products'),

  updateProduct: (id: string, data: unknown) =>
    api.put(`/products/${id}`, data),

  getRefunds: () => api.get('/refunds'),

  createRefund: (data: unknown) => api.post('/refunds', data),

  accessCheck: (params: AccessCheckRequest) =>
    api.post<AccessCheckResponse>('/access-check', params),

  getPolicies: () => api.get<Policy[]>('/policies'),

  getAuditLog: (page?: number) =>
    api.get<AuditLogItem[]>('/audit-log', {
      params: page ? { page } : undefined,
    }),
};