import type { CSSProperties, ReactNode } from "react";

export interface StyleProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}
