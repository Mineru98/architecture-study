import { StyledContainer } from "./styles";
import type { ContainerProps } from "./types";

export function Container({
  children,
  maxWidth = "72rem",
  padding = "var(--va-space-16)",
  centered = true,
  ...props
}: ContainerProps) {
  return (
    <StyledContainer maxWidth={maxWidth} padding={padding} centered={centered} {...props}>
      {children}
    </StyledContainer>
  );
}

export type { ContainerProps } from "./types";
