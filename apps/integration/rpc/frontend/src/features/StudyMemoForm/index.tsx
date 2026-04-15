import { Button, Card, FormField, Input, Section, Stack, Text } from "@vibe-architecture/react";
import { useStudyMemoForm } from "./hooks";
import { FormGrid, FormHint, Textarea } from "./styles";

export function StudyMemoForm() {
  const { draftId, form, mutation } = useStudyMemoForm();
  const { register, handleSubmit, formState: { errors } } = form;

  return (
    <Section title="Study memo" description="프로젝트 단위 학습 메모를 저장합니다.">
      <Card>
        <form onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <Stack gap="var(--va-space-16)">
            <FormHint>
              <Text as="span">Draft {draftId}</Text>
              <Text>결정은 짧고 명확하게 남깁니다.</Text>
            </FormHint>
            <FormGrid>
              <FormField fieldId="memo-title" label="메모 제목" error={errors.title?.message}>
                <Input id="memo-title" {...register("title", { required: "제목을 입력하세요." })} />
              </FormField>
              <FormField fieldId="memo-goal" label="학습 목표" error={errors.goal?.message}>
                <Input id="memo-goal" {...register("goal", { required: "학습 목표를 입력하세요." })} />
              </FormField>
              <FormField fieldId="memo-decision" label="설계 결정" error={errors.decision?.message}>
                <Input id="memo-decision" {...register("decision", { required: "설계 결정을 입력하세요." })} />
              </FormField>
              <FormField fieldId="memo-notes" label="세부 메모" error={errors.notes?.message}>
                <Textarea id="memo-notes" {...register("notes", { required: "세부 메모를 입력하세요." })} />
              </FormField>
            </FormGrid>
            <Button type="submit">{mutation.isPending ? "Saving..." : "Save memo"}</Button>
          </Stack>
        </form>
      </Card>
    </Section>
  );
}
