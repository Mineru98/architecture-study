import { StyledBadge } from "./styles";
import type { BadgeProps } from "./types";

export function Badge({
  children,
  tone = "neutral",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <StyledBadge tone={tone} size={size} {...props}>
      {children}
    </StyledBadge>
  );
}

export type { BadgeProps } from "./types";
