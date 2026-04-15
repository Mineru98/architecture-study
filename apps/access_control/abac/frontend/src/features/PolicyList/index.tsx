import { Divider, Heading, Section, Stack, Text } from '@vibe-architecture/react';
import { useQuery } from '@tanstack/react-query';
import { abacApi } from '../../shared/api/abacApi';
import type { AttributeCondition } from '../../shared/types/abac';
import { PolicyCard, PolicyGrid, PriorityBadge, RuleChip, RuleChipWrap } from './styles';

export function PolicyList() {
  const { data: policies = [] } = useQuery({
    queryKey: ['policies'],
    queryFn: abacApi.getPolicies,
  });

  return (
    <Section
      title="Policy Registry"
      description="시스템에 등록된 ABAC 정책 목록입니다."
    >
      <PolicyGrid>
        {policies.map((p) => (
          <PolicyCard key={p.id} effect={p.effect}>
            <Stack gap="var(--va-space-8)">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Heading level={3}>{p.name}</Heading>
                <PriorityBadge>P{p.priority}</PriorityBadge>
              </div>
              <Text>{p.description}</Text>
              <Divider />
              <Text as="small">Effect: {p.effect.toUpperCase()}</Text>
              {Object.entries(p.rules).map(([group, conditions]) => (
                <div key={group}>
                  <Text as="small">{group}</Text>
                  <RuleChipWrap>
                    {(conditions as AttributeCondition[]).map((c, i) => (
                      <RuleChip key={i}>
                        {c.attribute} {c.operator} {String(c.value)}
                      </RuleChip>
                    ))}
                  </RuleChipWrap>
                </div>
              ))}
            </Stack>
          </PolicyCard>
        ))}
      </PolicyGrid>
    </Section>
  );
}
