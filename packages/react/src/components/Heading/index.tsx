import { StyledHeading } from "./styles";
import type { HeadingProps } from "./types";

export function Heading({
  children,
  level = 2,
  ...props
}: HeadingProps) {
  return (
    <StyledHeading as={`h${level}`} level={level} {...props}>
      {children}
    </StyledHeading>
  );
}

export type { HeadingProps } from "./types";
