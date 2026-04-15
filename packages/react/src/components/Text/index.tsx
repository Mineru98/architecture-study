import { StyledText } from "./styles";
import type { TextProps } from "./types";

export function Text({
  as = "p",
  variant = "body",
  children,
  ...props
}: TextProps) {
  return (
    <StyledText as={as} variant={variant} {...props}>
      {children}
    </StyledText>
  );
}

export type { TextProps } from "./types";
