import type { ProjectMeta, StudyMemo } from "../../shared/types/project";

export type StudyProjectState = {
  meta: ProjectMeta;
  memos: StudyMemo[];
  endpointPreview: string;
};
