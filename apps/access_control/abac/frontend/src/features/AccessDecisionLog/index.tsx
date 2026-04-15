import { Card, Section, Stack, Text } from '@vibe-architecture/react';
import { useQuery } from '@tanstack/react-query';
import { abacApi } from '../../shared/api/abacApi';
import { DecisionBadge, LogEntry, LogTimeline } from './styles';

export function AccessDecisionLog() {
  const { data: auditLog = [] } = useQuery({
    queryKey: ['audit-log'],
    queryFn: abacApi.getAuditLog,
  });

  return (
    <Section
      title="Access Decision Log"
      description="최근 접근 평가 이력을 타임라인으로 확인합니다."
    >
      <LogTimeline>
        {auditLog.map((entry) => (
          <LogEntry key={entry.id} allowed={entry.allowed}>
            <Stack gap="var(--va-space-4)">
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <DecisionBadge allowed={entry.allowed}>
                  {entry.allowed ? 'ALLOW' : 'DENY'}
                </DecisionBadge>
                <Text as="small">{entry.timestamp}</Text>
              </div>
              <Text>{entry.reason}</Text>
              <Text as="small">
                Subject: {entry.request.subjectId} → {entry.request.action}{' '}
                {entry.request.resourceType}/{entry.request.resourceId}
              </Text>
            </Stack>
          </LogEntry>
        ))}
        {!auditLog.length && (
          <Card>
            <Text>아직 평가 이력이 없습니다.</Text>
          </Card>
        )}
      </LogTimeline>
    </Section>
  );
}
