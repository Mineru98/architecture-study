import type { PullToRefreshProps } from "./types";

export function PullToRefresh({ children, ...props }: PullToRefreshProps) {
  return <div {...props}>{children}</div>;
}

export type { PullToRefreshProps } from "./types";
