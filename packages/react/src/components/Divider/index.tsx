import { StyledDivider } from "./styles";
import type { DividerProps } from "./types";

export function Divider({ orientation = "horizontal", ...props }: DividerProps) {
  return <StyledDivider orientation={orientation} {...props} />;
}

export type { DividerProps } from "./types";
