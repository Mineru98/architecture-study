import { StyledStack } from "./styles";
import type { StackProps } from "./types";

export function Stack({
  direction = "column",
  gap = "var(--va-space-16)",
  align = "stretch",
  justify = "flex-start",
  children,
  ...props
}: StackProps) {
  return (
    <StyledStack direction={direction} gap={gap} align={align} justify={justify} {...props}>
      {children}
    </StyledStack>
  );
}

export type { StackProps } from "./types";
