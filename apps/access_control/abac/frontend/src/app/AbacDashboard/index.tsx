import { Container, Heading, Stack, Text } from '@vibe-architecture/react';
import { AttributeInspector } from '../../features/AttributeInspector';
import { PolicySimulator } from '../../features/PolicySimulator';
import { PolicyList } from '../../features/PolicyList';
import { AccessDecisionLog } from '../../features/AccessDecisionLog';
import { DashboardShell, HeroPanel, ScenarioCard, ScenarioGrid } from './styles';

export function AbacDashboard() {
  return (
    <DashboardShell>
      <Container>
        <Stack gap="var(--va-space-24)">
          <HeroPanel>
            <Stack gap="var(--va-space-16)">
              <Text as="span">Access Control</Text>
              <Heading level={1}>ABAC 정책 시뮬레이터</Heading>
              <Text>
                사용자, 리소스, 액션, 환경 속성을 조합해 문맥 기반 접근 결정을 체험합니다.
              </Text>
              <ScenarioGrid>
                <ScenarioCard>
                  <Heading level={3}>시나리오 1</Heading>
                  <Text>같은 seller라도 자신의 상품만 수정 가능</Text>
                </ScenarioCard>
                <ScenarioCard>
                  <Heading level={3}>시나리오 2</Heading>
                  <Text>고액 환불(≥10만원)은 신뢰 IP + 승인 필요</Text>
                </ScenarioCard>
                <ScenarioCard>
                  <Heading level={3}>시나리오 3</Heading>
                  <Text>admin은 모든 리소스 접근 가능</Text>
                </ScenarioCard>
              </ScenarioGrid>
            </Stack>
          </HeroPanel>

          <AttributeInspector />
          <PolicySimulator />
          <PolicyList />
          <AccessDecisionLog />
        </Stack>
      </Container>
    </DashboardShell>
  );
}
