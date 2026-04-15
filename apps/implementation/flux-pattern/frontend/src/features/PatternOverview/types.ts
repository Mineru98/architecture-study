import type { ProjectMeta } from "../../shared/types/project";

export type PatternOverviewProps = {
  activeView: "overview" | "notes";
  meta: ProjectMeta;
};
