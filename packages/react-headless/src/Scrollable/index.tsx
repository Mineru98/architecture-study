import type { ScrollableProps } from "./types";

export function Scrollable({ children, ...props }: ScrollableProps) {
  return <div {...props}>{children}</div>;
}

export type { ScrollableProps } from "./types";
