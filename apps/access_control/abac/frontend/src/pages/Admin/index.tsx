import React, { useState, useEffect } from 'react';
import {
  Stack,
  Button,
  Heading,
  Text,
  Badge,
  Card,
  Divider,
  FormField,
  Input,
  Section,
} from '@vibe-architecture/react';
import apiClient from '../../shared/api/apiClient';
import { useAuthStore } from '../../shared/store/authStore';
import { API_ROUTES, ORDER_STATUS } from '../../shared/constants';
import { Product, Order, Policy, EvaluationRequest, EvaluationResult, AuditLogEntry } from './types';

type AdminTab = 'products' | 'orders' | 'policies';

type EvaluationResponse = {
  decision?: string;
  effect?: string;
  allow?: boolean;
  allowed?: boolean;
  reason?: string;
  message?: string;
  matchedPolicy?: string | { name?: string } | null;
  matchedPolicyName?: string;
  policyName?: string;
};

const initialRequest: EvaluationRequest = {
  subject: {
    role: 'customer',
    trustLevel: 1,
  },
  resource: {
    type: 'product',
    amount: 0,
    ownerId: '',
  },
  action: 'read',
  environment: {
    hour: 9,
    trustedNetwork: false,
  },
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '44px',
  border: '1px solid var(--va-color-border-default)',
  borderRadius: 'var(--va-radius-8)',
  padding: '0 var(--va-space-12)',
  background: 'var(--va-color-bg-default)',
  color: 'var(--va-color-fg-default)',
};

const headerGridStyle: React.CSSProperties = {
  display: 'grid',
  gap: 'var(--va-space-12)',
  padding: '0 0 var(--va-space-8)',
  borderBottom: '1px solid var(--va-color-border-default)',
};

const rowGridStyle: React.CSSProperties = {
  display: 'grid',
  gap: 'var(--va-space-12)',
  alignItems: 'center',
  padding: 'var(--va-space-12) 0',
};

const Admin: React.FC = () => {
  const user = useAuthStore((s) => s.user);
  const [tab, setTab] = useState<AdminTab>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>([]);
  const [request, setRequest] = useState<EvaluationRequest>(initialRequest);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [policyError, setPolicyError] = useState('');
  const [auditError, setAuditError] = useState('');
  const [resultError, setResultError] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  useEffect(() => {
    apiClient.get('/products').then((res) => setProducts(res.data.items || res.data));
    apiClient.get('/orders').then((res) => setOrders(res.data));
    void fetchPolicies();
    void fetchAuditLog();
  }, []);

  if (!user || user.role !== 'admin') {
    return <Text>관리자 권한이 필요합니다.</Text>;
  }

  const fetchPolicies = async () => {
    try {
      const res = await apiClient.get(API_ROUTES.POLICIES);
      setPolicies(Array.isArray(res.data?.items) ? res.data.items : res.data);
      setPolicyError('');
    } catch {
      setPolicyError('정책 목록을 불러오지 못했습니다.');
    }
  };

  const fetchAuditLog = async () => {
    try {
      const res = await apiClient.get(API_ROUTES.AUDIT_LOG);
      setAuditLog(Array.isArray(res.data?.items) ? res.data.items : res.data);
      setAuditError('');
    } catch {
      setAuditError('평가 이력을 불러오지 못했습니다.');
    }
  };

  const deleteProduct = async (id: string) => {
    await apiClient.delete(`/products/${id}`);
    setProducts(products.filter((p) => p.id !== id));
  };

  const updateStatus = async (id: string, status: string) => {
    await apiClient.patch(`/orders/${id}/status`, { status });
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const updateRequest = <T extends keyof EvaluationRequest>(key: T, value: EvaluationRequest[T]) => {
    setRequest((current) => ({ ...current, [key]: value }));
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEvaluating(true);
    setResultError('');
    try {
      const res = await apiClient.post<EvaluationResponse>(API_ROUTES.ACCESS_CHECK, request);
      setResult(normalizeEvaluationResult(res.data));
      await fetchAuditLog();
    } catch {
      setResult(null);
      setResultError('접근 평가 요청에 실패했습니다.');
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div>
      <Heading level={2}>관리자 패널</Heading>
      <Stack direction="row" gap="var(--va-space-8)" style={{ marginBottom: '16px', flexWrap: 'wrap' }}>
        <Button variant={tab === 'products' ? 'solid' : 'outline'} onClick={() => setTab('products')}>상품 관리</Button>
        <Button variant={tab === 'orders' ? 'solid' : 'outline'} onClick={() => setTab('orders')}>주문 관리</Button>
        <Button variant={tab === 'policies' ? 'solid' : 'outline'} onClick={() => setTab('policies')}>ABAC 정책</Button>
      </Stack>

      {tab === 'products' && (
        <Card>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ ...headerGridStyle, gridTemplateColumns: '1.2fr 2fr 1.2fr 1fr 1.2fr 1fr' }}>
              <Text variant="caption">ID</Text>
              <Text variant="caption">이름</Text>
              <Text variant="caption">가격</Text>
              <Text variant="caption">재고</Text>
              <Text variant="caption">카테고리</Text>
              <Text variant="caption">관리</Text>
            </div>
            {products.map((p) => (
              <div key={p.id} style={{ ...rowGridStyle, gridTemplateColumns: '1.2fr 2fr 1.2fr 1fr 1.2fr 1fr' }}>
                <Text>{p.id.slice(0, 8)}</Text>
                <Text>{p.name}</Text>
                <Text>{p.price.toLocaleString()}원</Text>
                <Text>{p.stock}</Text>
                <Text>{p.category}</Text>
                <Button variant="ghost" onClick={() => deleteProduct(p.id)} style={{ color: 'var(--va-color-danger)' }}>삭제</Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'orders' && (
        <Card>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ ...headerGridStyle, gridTemplateColumns: '1.2fr 1.4fr 1.2fr 1.2fr 1.4fr' }}>
              <Text variant="caption">주문번호</Text>
              <Text variant="caption">사용자</Text>
              <Text variant="caption">금액</Text>
              <Text variant="caption">상태</Text>
              <Text variant="caption">관리</Text>
            </div>
            {orders.map((o) => (
              <div key={o.id} style={{ ...rowGridStyle, gridTemplateColumns: '1.2fr 1.4fr 1.2fr 1.2fr 1.4fr' }}>
                <Text>{o.id.slice(0, 8)}</Text>
                <Text>{o.userId}</Text>
                <Text>{Number(o.total).toLocaleString()}원</Text>
                <Text>{ORDER_STATUS[o.status] || o.status}</Text>
                <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)} style={selectStyle}>
                  <option value="pending">결제 대기</option>
                  <option value="paid">결제 완료</option>
                  <option value="shipped">배송 중</option>
                  <option value="delivered">배송 완료</option>
                  <option value="cancelled">주문 취소</option>
                </select>
              </div>
            ))}
          </div>
        </Card>
      )}

      {tab === 'policies' && (
        <Stack gap="var(--va-space-16)">
          <Section
            title="정책 목록"
            description="우선순위 순으로 적용되는 ABAC 시드 정책 7개를 확인합니다."
            action={<Button variant="outline" onClick={() => void fetchPolicies()}>새로고침</Button>}
          >
            <Card>
              {policyError && <Text style={{ color: 'var(--va-color-danger)' }}>{policyError}</Text>}
              {!policyError && policies.length === 0 && <Text>등록된 정책이 없습니다.</Text>}
              {policies.length > 0 && (
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ ...headerGridStyle, gridTemplateColumns: '1.8fr 0.8fr 0.8fr 2.6fr' }}>
                    <Text variant="caption">이름</Text>
                    <Text variant="caption">우선순위</Text>
                    <Text variant="caption">효과</Text>
                    <Text variant="caption">조건</Text>
                  </div>
                  {policies.map((policy, index) => (
                    <div key={policy.id || `${policy.name}-${index}`} style={{ ...rowGridStyle, gridTemplateColumns: '1.8fr 0.8fr 0.8fr 2.6fr' }}>
                      <Text>{policy.name}</Text>
                      <Text>{policy.priority}</Text>
                      <Badge
                        tone={policy.effect === 'allow' ? 'inverse' : 'neutral'}
                        style={policy.effect === 'allow'
                          ? { backgroundColor: '#1f7a1f', color: 'var(--va-color-white)' }
                          : { backgroundColor: 'var(--va-color-danger)', color: 'var(--va-color-white)' }}
                      >
                        {policy.effect}
                      </Badge>
                      <Text>{summarizeConditions(policy.conditions)}</Text>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Section>

          <Section
            title="접근 평가 시뮬레이터"
            description="Subject, Resource, Action, Environment 속성을 조합해 정책 평가를 직접 실행합니다."
          >
            <Card>
              <form onSubmit={handleEvaluate}>
                <Stack gap="var(--va-space-16)">
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--va-space-16)' }}>
                    <FormField label="역할" fieldId="subject-role">
                      <select
                        id="subject-role"
                        value={request.subject.role}
                        onChange={(e) => updateRequest('subject', { ...request.subject, role: e.target.value })}
                        style={selectStyle}
                      >
                        <option value="customer">customer</option>
                        <option value="seller">seller</option>
                        <option value="cs-agent">cs-agent</option>
                        <option value="admin">admin</option>
                      </select>
                    </FormField>

                    <FormField label="신뢰 레벨" fieldId="subject-trust-level">
                      <Input
                        id="subject-trust-level"
                        type="number"
                        min={1}
                        max={5}
                        value={String(request.subject.trustLevel)}
                        onChange={(e) => updateRequest('subject', { ...request.subject, trustLevel: Number(e.target.value) })}
                      />
                    </FormField>

                    <FormField label="리소스 타입" fieldId="resource-type">
                      <select
                        id="resource-type"
                        value={request.resource.type}
                        onChange={(e) => updateRequest('resource', { ...request.resource, type: e.target.value })}
                        style={selectStyle}
                      >
                        <option value="product">product</option>
                        <option value="order">order</option>
                        <option value="refund">refund</option>
                      </select>
                    </FormField>

                    <FormField label="금액" fieldId="resource-amount">
                      <Input
                        id="resource-amount"
                        type="number"
                        min={0}
                        value={String(request.resource.amount)}
                        onChange={(e) => updateRequest('resource', { ...request.resource, amount: Number(e.target.value) })}
                      />
                    </FormField>

                    <FormField label="소유자 ID" fieldId="resource-owner-id">
                      <Input
                        id="resource-owner-id"
                        type="text"
                        value={request.resource.ownerId}
                        onChange={(e) => updateRequest('resource', { ...request.resource, ownerId: e.target.value })}
                      />
                    </FormField>

                    <FormField label="액션" fieldId="action">
                      <select
                        id="action"
                        value={request.action}
                        onChange={(e) => updateRequest('action', e.target.value)}
                        style={selectStyle}
                      >
                        <option value="read">read</option>
                        <option value="create">create</option>
                        <option value="update">update</option>
                        <option value="delete">delete</option>
                        <option value="refund">refund</option>
                      </select>
                    </FormField>

                    <FormField label="시간" fieldId="environment-hour">
                      <Input
                        id="environment-hour"
                        type="number"
                        min={0}
                        max={23}
                        value={String(request.environment.hour)}
                        onChange={(e) => updateRequest('environment', { ...request.environment, hour: Number(e.target.value) })}
                      />
                    </FormField>

                    <FormField label="신뢰 네트워크" fieldId="environment-network">
                      <label htmlFor="environment-network" style={{ display: 'flex', alignItems: 'center', gap: 'var(--va-space-8)', minHeight: '44px' }}>
                        <input
                          id="environment-network"
                          type="checkbox"
                          checked={request.environment.trustedNetwork}
                          onChange={(e) => updateRequest('environment', { ...request.environment, trustedNetwork: e.target.checked })}
                        />
                        <Text>trustedNetwork</Text>
                      </label>
                    </FormField>
                  </div>

                  <Stack direction="row" gap="var(--va-space-8)">
                    <Button type="submit" variant="solid" disabled={isEvaluating}>
                      {isEvaluating ? '평가 중...' : '접근 평가 실행'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => { setRequest(initialRequest); setResult(null); setResultError(''); }}>
                      초기화
                    </Button>
                  </Stack>
                </Stack>
              </form>

              <Divider style={{ margin: 'var(--va-space-16) 0' }} />

              {resultError && <Text style={{ color: 'var(--va-color-danger)' }}>{resultError}</Text>}
              {!resultError && !result && <Text>평가 결과가 여기에 표시됩니다.</Text>}
              {result && (
                <Card style={{ background: 'var(--va-color-bg-muted)' }}>
                  <Stack gap="var(--va-space-8)">
                    <Stack direction="row" gap="var(--va-space-8)" align="center">
                      <Text style={{ fontWeight: 600 }}>결정</Text>
                      <Badge
                        tone={result.decision === 'allow' ? 'inverse' : 'neutral'}
                        style={result.decision === 'allow'
                          ? { backgroundColor: '#1f7a1f', color: 'var(--va-color-white)' }
                          : { backgroundColor: 'var(--va-color-danger)', color: 'var(--va-color-white)' }}
                      >
                        {result.decision}
                      </Badge>
                    </Stack>
                    <Text>적용 정책: {result.matchedPolicyName || '-'}</Text>
                    <Text>사유: {result.reason}</Text>
                  </Stack>
                </Card>
              )}
            </Card>
          </Section>

          <Section
            title="평가 이력"
            description="최근 접근 결정 로그를 확인하고 정책 시뮬레이션의 영향을 추적합니다."
            action={<Button variant="outline" onClick={() => void fetchAuditLog()}>새로고침</Button>}
          >
            <Card>
              {auditError && <Text style={{ color: 'var(--va-color-danger)' }}>{auditError}</Text>}
              {!auditError && auditLog.length === 0 && <Text>평가 이력이 없습니다.</Text>}
              {auditLog.length > 0 && (
                <div style={{ overflowX: 'auto' }}>
                  <div style={{ ...headerGridStyle, gridTemplateColumns: '1.2fr 1fr 0.8fr 1.2fr 0.8fr 2fr' }}>
                    <Text variant="caption">시간</Text>
                    <Text variant="caption">사용자</Text>
                    <Text variant="caption">액션</Text>
                    <Text variant="caption">리소스</Text>
                    <Text variant="caption">결정</Text>
                    <Text variant="caption">사유</Text>
                  </div>
                  {auditLog.map((entry, index) => (
                    <div key={entry.id || `${entry.timestamp}-${index}`} style={{ ...rowGridStyle, gridTemplateColumns: '1.2fr 1fr 0.8fr 1.2fr 0.8fr 2fr' }}>
                      <Text>{formatTimestamp(entry.timestamp)}</Text>
                      <Text>{entry.subject?.id || entry.subject?.role || '-'}</Text>
                      <Text>{entry.action}</Text>
                      <Text>{formatResource(entry.resource)}</Text>
                      <Badge
                        tone={entry.result?.allowed ? 'inverse' : 'neutral'}
                        style={entry.result?.allowed
                          ? { backgroundColor: '#1f7a1f', color: 'var(--va-color-white)' }
                          : { backgroundColor: 'var(--va-color-danger)', color: 'var(--va-color-white)' }}
                      >
                        {entry.result?.allowed ? 'allow' : 'deny'}
                      </Badge>
                      <Text>{entry.result?.reason || '-'}</Text>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </Section>
        </Stack>
      )}
    </div>
  );
};

function normalizeEvaluationResult(data: EvaluationResponse): EvaluationResult {
  const decision = data.decision
    || data.effect
    || (data.allow || data.allowed ? 'allow' : 'deny');
  const matchedPolicyName = typeof data.matchedPolicy === 'string'
    ? data.matchedPolicy
    : data.matchedPolicy?.name || data.matchedPolicyName || data.policyName;

  return {
    decision,
    reason: data.reason || data.message || '평가 근거가 제공되지 않았습니다.',
    matchedPolicyName,
  };
}

function summarizeConditions(conditions: unknown): string {
  if (typeof conditions === 'string') {
    return conditions;
  }
  if (Array.isArray(conditions)) {
    return conditions.map((condition) => summarizeConditions(condition)).join(', ');
  }
  if (conditions && typeof conditions === 'object') {
    return Object.entries(conditions as Record<string, unknown>)
      .map(([key, value]) => `${key}: ${summarizeConditions(value)}`)
      .join(', ');
  }
  return '-';
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return timestamp;
  }
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

function formatResource(resource: Record<string, unknown> | undefined): string {
  if (!resource) return '-';
  const type = resource.type || resource.resourceType || '';
  const amount = resource.amount !== undefined ? ` (${Number(resource.amount).toLocaleString()}원)` : '';
  return `${type}${amount}`;
}

export default Admin;
