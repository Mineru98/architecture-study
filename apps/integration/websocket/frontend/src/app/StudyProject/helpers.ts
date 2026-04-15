import dayjs from "dayjs";
import type { ProjectMeta, StudyMemo } from "../../shared/types/project";
import type { StudyProjectState } from "./types";

export function buildStudyProjectState(meta: ProjectMeta, memos: StudyMemo[]): StudyProjectState {
  return {
    meta,
    memos,
    endpointPreview: meta.endpoints[1] ?? "/api/project/meta",
  };
}

export function formatDate(value: string) {
  return dayjs(value).format("YYYY.MM.DD HH:mm");
}
