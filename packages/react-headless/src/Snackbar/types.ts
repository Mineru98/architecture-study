import type { HTMLAttributes, ReactNode } from "react";

export interface SnackbarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  open?: boolean;
}
