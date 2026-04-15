import { StyledButton } from "./styles";
import type { ButtonProps } from "./types";

export function Button({ variant = "solid", children, ...props }: ButtonProps) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

export type { ButtonProps } from "./types";
