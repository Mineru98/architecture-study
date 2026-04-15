import type { HTMLAttributes, ReactNode } from "react";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: "row" | "column";
  gap?: string;
  align?: string;
  justify?: string;
}
