import { Card, Heading, Stack, Text } from "@vibe-architecture/react";
import type { PatternOverviewProps } from "./types";
import { OverviewGrid } from "./styles";

export function PatternOverview({ activeView, meta }: PatternOverviewProps) {
  const content = activeView === "overview"
    ? [
        ["질문", meta.question],
        ["시나리오", meta.scenario],
        ["프론트 스택", meta.frontendTechStack.join(", ")],
        ["백엔드 스택", meta.backendTechStack.join(", ")],
      ]
    : meta.endpoints.map((endpoint) => ["Endpoint", endpoint]);

  return (
    <OverviewGrid>
      {content.map(([label, value]) => (
        <Card key={`${label}-${value}`}>
          <Stack gap="var(--va-space-8)">
            <Heading level={3}>{label}</Heading>
            <Text>{value}</Text>
          </Stack>
        </Card>
      ))}
    </OverviewGrid>
  );
}
