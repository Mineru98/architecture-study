import type { HTMLAttributes, ReactNode } from "react";

export interface ScrollableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}
