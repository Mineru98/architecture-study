import styled from "styled-components";
import type { ContainerProps } from "./types";

interface StyledContainerProps extends Required<Pick<ContainerProps, "maxWidth" | "padding" | "centered">> {}

export const StyledContainer = styled.div<StyledContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  padding: ${({ padding }) => padding};
  margin-left: ${({ centered }) => (centered ? "auto" : "0")};
  margin-right: ${({ centered }) => (centered ? "auto" : "0")};
  box-sizing: border-box;
`;
