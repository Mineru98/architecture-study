import { StyledCard } from "./styles";
import type { CardProps } from "./types";

export function Card({ children, ...props }: CardProps) {
  return <StyledCard {...props}>{children}</StyledCard>;
}

export type { CardProps } from "./types";
