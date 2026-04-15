import styled, { css } from "styled-components";
import type { TextProps } from "./types";

const variantStyles = {
  body: css`
    color: var(--va-color-fg-default);
    font-size: var(--va-font-size-16);
    font-weight: var(--va-font-weight-400);
    line-height: 1.5;
  `,
  caption: css`
    color: var(--va-color-fg-muted);
    font-size: var(--va-font-size-12);
    font-weight: var(--va-font-weight-400);
    line-height: 1.4;
  `,
  muted: css`
    color: var(--va-color-fg-muted);
    font-size: var(--va-font-size-14);
    font-weight: var(--va-font-weight-400);
    line-height: 1.4;
  `,
} as const;

export const StyledText = styled.span<Required<Pick<TextProps, "variant">>>`
  margin: 0;
  ${({ variant }) => variantStyles[variant]}
`;
