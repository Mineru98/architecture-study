import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProjectMeta, fetchStudyMemos } from "../../shared/api/projectApi";
import { projectMeta } from "../../shared/constants/projectMeta";
import { useProjectUiStore } from "../../shared/store/projectUiStore";
import { buildStudyProjectState } from "./helpers";

export function useStudyProject() {
  const { activeView, setActiveView } = useProjectUiStore();

  const metaQuery = useQuery({
    queryKey: ["project-meta"],
    queryFn: fetchProjectMeta,
    placeholderData: projectMeta,
  });

  const memoQuery = useQuery({
    queryKey: ["study-memos"],
    queryFn: fetchStudyMemos,
    placeholderData: [],
  });

  const meta = metaQuery.data ?? projectMeta;
  const memos = memoQuery.data ?? [];
  const state = useMemo(() => buildStudyProjectState(meta, memos), [meta, memos]);

  return {
    activeView,
    setActiveView,
    state,
    isLoading: metaQuery.isLoading || memoQuery.isLoading,
  };
}
