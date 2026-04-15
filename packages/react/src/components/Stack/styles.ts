import styled from "styled-components";
import type { StackProps } from "./types";

export const StyledStack = styled.div<Required<Pick<StackProps, "direction" | "gap" | "align" | "justify">>>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  gap: ${({ gap }) => gap};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
`;
