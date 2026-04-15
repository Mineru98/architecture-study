import styled, { css } from "styled-components";
import type { DividerProps } from "./types";

export const StyledDivider = styled.hr<Required<Pick<DividerProps, "orientation">>>`
  border: 0;
  margin: 0;
  ${({ orientation }) =>
    orientation === "vertical"
      ? css`
          width: 1px;
          min-height: 100%;
          align-self: stretch;
          background: var(--va-color-border-default);
        `
      : css`
          height: 1px;
          width: 100%;
          background: var(--va-color-border-default);
        `}
`;
