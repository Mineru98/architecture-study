import type { HTMLAttributes, ReactNode } from "react";

export interface PullToRefreshProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  onRefresh?: () => void | Promise<void>;
}
