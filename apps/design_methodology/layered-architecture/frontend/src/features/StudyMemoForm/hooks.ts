import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { nanoid } from "nanoid";
import { createStudyMemo } from "../../shared/api/projectApi";
import type { StudyMemoFormValues } from "../../shared/types/project";
import { formDefaults } from "./constants";
import { normalizeStudyMemoPayload } from "./helpers";

export function useStudyMemoForm() {
  const queryClient = useQueryClient();
  const draftId = useMemo(() => nanoid(8), []);
  const form = useForm<StudyMemoFormValues>({ defaultValues: formDefaults });

  const mutation = useMutation({
    mutationFn: async (values: StudyMemoFormValues) => createStudyMemo(normalizeStudyMemoPayload(values)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["study-memos"] });
      form.reset(formDefaults);
    },
  });

  return { draftId, form, mutation };
}
