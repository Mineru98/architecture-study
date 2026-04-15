import { Button, Card, FormField, Heading, Section, Stack, Text } from '@vibe-architecture/react';
import { useSimulator } from './hooks';
import {
  AttributeChip,
  ChipWrap,
  PolicyMatchCard,
  ResultPanel,
  SimulatorContainer,
  StyledSelect,
} from './styles';

export function PolicySimulator() {
  const {
    decision,
    users,
    resources,
    isPending,
    selectedUserId,
    selectedResourceType,
    selectedResourceId,
    selectedAction,
    environment,
    setSelectedUserId,
    setSelectedResourceType,
    setSelectedResourceId,
    setSelectedAction,
    setEnvironment,
    checkAccess,
  } = useSimulator();

  return (
    <Section
      title="Policy Simulator"
      description="사용자·리소스·액션·환경을 선택하고 접근 평가 결과를 확인합니다."
    >
      <SimulatorContainer>
        <Card>
          <Stack gap="var(--va-space-16)">
            <FormField fieldId="sim-user" label="Subject (사용자)">
              <StyledSelect
                id="sim-user"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">-- 사용자 선택 --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.role})
                  </option>
                ))}
              </StyledSelect>
            </FormField>

            <FormField fieldId="sim-resource-type" label="Resource Type">
              <StyledSelect
                id="sim-resource-type"
                value={selectedResourceType}
                onChange={(e) =>
                  setSelectedResourceType(e.target.value as 'product' | 'refund')
                }
              >
                <option value="product">Product</option>
                <option value="refund">Refund</option>
              </StyledSelect>
            </FormField>

            <FormField fieldId="sim-resource" label="Resource">
              <StyledSelect
                id="sim-resource"
                value={selectedResourceId}
                onChange={(e) => setSelectedResourceId(e.target.value)}
              >
                <option value="">-- 리소스 선택 --</option>
                {resources.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label}
                  </option>
                ))}
              </StyledSelect>
            </FormField>

            <FormField fieldId="sim-action" label="Action">
              <StyledSelect
                id="sim-action"
                value={selectedAction}
                onChange={(e) =>
                  setSelectedAction(e.target.value as 'read' | 'update' | 'delete' | 'refund')
                }
              >
                <option value="read">read</option>
                <option value="update">update</option>
                <option value="delete">delete</option>
                <option value="refund">refund</option>
              </StyledSelect>
            </FormField>

            <Heading level={3}>Environment</Heading>

            <FormField fieldId="sim-ip" label="IP Address">
              <input
                id="sim-ip"
                type="text"
                value={environment.ipAddress}
                onChange={(e) => setEnvironment({ ipAddress: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(17,17,17,0.14)',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </FormField>

            <FormField fieldId="sim-hour" label="Current Hour (0-23)">
              <input
                id="sim-hour"
                type="number"
                min={0}
                max={23}
                value={environment.currentHour}
                onChange={(e) =>
                  setEnvironment({ currentHour: Number(e.target.value) })
                }
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(17,17,17,0.14)',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </FormField>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={environment.isTrustedNetwork}
                onChange={(e) => setEnvironment({ isTrustedNetwork: e.target.checked })}
              />
              <Text as="span">Trusted Network</Text>
            </label>

            <Button
              type="button"
              onClick={checkAccess}
            >
              {isPending ? '평가 중...' : '접근 평가 실행'}
            </Button>
          </Stack>
        </Card>

        <Stack gap="var(--va-space-16)">
          {decision ? (
            <>
              <ResultPanel allowed={decision.allowed}>
                <Stack gap="var(--va-space-8)">
                  <Heading level={2}>{decision.allowed ? 'ALLOW' : 'DENY'}</Heading>
                  <Text>{decision.reason}</Text>
                  {decision.appliedPolicy && (
                    <Text>적용 정책: {decision.appliedPolicy.name}</Text>
                  )}
                </Stack>
              </ResultPanel>

              {decision.matchedPolicies.map((pm) => (
                <PolicyMatchCard key={pm.policy.id} matched={pm.matched}>
                  <Stack gap="var(--va-space-8)">
                    <Heading level={3}>{pm.policy.name}</Heading>
                    <ChipWrap>
                      {pm.details.map((d, i) => (
                        <AttributeChip key={i} group={d.group} result={d.result}>
                          {d.group}.{d.attribute} {d.operator} {String(d.expected)} →{' '}
                          {String(d.actual)} ({d.result ? '✓' : '✗'})
                        </AttributeChip>
                      ))}
                    </ChipWrap>
                  </Stack>
                </PolicyMatchCard>
              ))}
            </>
          ) : (
            <Card>
              <Text>왼쪽에서 조건을 선택하고 평가를 실행하면 결과가 여기에 표시됩니다.</Text>
            </Card>
          )}
        </Stack>
      </SimulatorContainer>
    </Section>
  );
}
