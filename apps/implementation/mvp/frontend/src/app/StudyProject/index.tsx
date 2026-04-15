import { Button, Card, Container, Divider, Heading, Section, Stack, Text } from "@vibe-architecture/react";
import { PatternOverview } from "../../features/PatternOverview";
import { StudyMemoForm } from "../../features/StudyMemoForm";
import { useStudyProject } from "./hooks";
import { formatDate } from "./helpers";
import { ContentGrid, EndpointBox, HeroGrid, HeroPanel, MemoList, MetricCard, ProjectShell } from "./styles";

export function StudyProject() {
  const { activeView, setActiveView, state, isLoading } = useStudyProject();

  return (
    <ProjectShell>
      <Container>
        <Stack gap="var(--va-space-24)">
          <HeroPanel>
            <Stack gap="var(--va-space-16)">
              <Text as="span">Implementation Pattern</Text>
              <Heading level={1}>{state.meta.title}</Heading>
              <Text>{state.meta.scenario}</Text>
              <HeroGrid>
                <MetricCard>
                  <Text as="span">핵심 질문</Text>
                  <Text>{state.meta.question}</Text>
                </MetricCard>
                <MetricCard>
                  <Text as="span">활성 뷰</Text>
                  <Text>{activeView}</Text>
                </MetricCard>
                <MetricCard>
                  <Text as="span">메모 수</Text>
                  <Text>{state.memos.length}개</Text>
                </MetricCard>
              </HeroGrid>
            </Stack>
          </HeroPanel>

          <ContentGrid>
            <Stack gap="var(--va-space-20)">
              <Section
                title="Project overview"
                description="현재 패턴 프로젝트를 단일 구조로 학습하기 위한 설명과 기술 스택을 정리합니다."
                action={
                  <Button type="button" onClick={() => setActiveView(activeView === "overview" ? "notes" : "overview")}>
                    {activeView === "overview" ? "Show notes" : "Show overview"}
                  </Button>
                }
              >
                <PatternOverview activeView={activeView} meta={state.meta} />
              </Section>

              <Section title="Study memos" description="프로젝트별 학습 메모와 결정 기록을 저장합니다.">
                <Stack gap="var(--va-space-16)">
                  <EndpointBox>{state.endpointPreview}</EndpointBox>
                  <MemoList>
                    {state.memos.map((memo) => (
                      <Card key={memo.id}>
                        <Stack gap="var(--va-space-8)">
                          <Heading level={3}>{memo.title}</Heading>
                          <Text>{memo.goal}</Text>
                          <Text>{memo.decision}</Text>
                          <Divider />
                          <Text>{memo.notes}</Text>
                          <Text as="small">{formatDate(memo.createdAt)}</Text>
                        </Stack>
                      </Card>
                    ))}
                    {!state.memos.length && !isLoading ? (
                      <Card>
                        <Text>아직 저장된 메모가 없습니다.</Text>
                      </Card>
                    ) : null}
                  </MemoList>
                </Stack>
              </Section>
            </Stack>

            <StudyMemoForm />
          </ContentGrid>
        </Stack>
      </Container>
    </ProjectShell>
  );
}
