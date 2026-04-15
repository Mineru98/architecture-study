import type { StudyMemoFormValues } from "../../shared/types/project";

export function normalizeStudyMemoPayload(values: StudyMemoFormValues): StudyMemoFormValues {
  return {
    title: values.title.trim(),
    goal: values.goal.trim(),
    decision: values.decision.trim(),
    notes: values.notes.trim(),
  };
}
