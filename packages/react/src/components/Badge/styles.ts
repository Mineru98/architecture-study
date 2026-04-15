import styled, { css } from "styled-components";
import type { BadgeProps } from "./types";

const toneStyles = {
  neutral: css`
    background: var(--va-color-bg-muted);
    color: var(--va-color-fg-default);
    border-color: var(--va-color-border-default);
  `,
  inverse: css`
    background: var(--va-color-bg-strong);
    color: var(--va-color-fg-inverse);
    border-color: var(--va-color-bg-strong);
  `,
  subtle: css`
    background: transparent;
    color: var(--va-color-fg-muted);
    border-color: transparent;
  `,
} as const;

const sizeStyles = {
  sm: {
    padding: "var(--va-space-2) var(--va-space-8)",
    fontSize: "var(--va-font-size-12)",
    fontWeight: 500,
  },
  md: {
    padding: "var(--va-space-4) var(--va-space-12)",
    fontSize: "var(--va-font-size-14)",
    fontWeight: 600,
  },
};

export const StyledBadge = styled.span<Required<Pick<BadgeProps, "tone" | "size">>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: var(--va-radius-12);
  white-space: nowrap;
  ${({ tone }) => toneStyles[tone]}
  ${({ size }) => css`
    padding: ${sizeStyles[size].padding};
    font-size: ${sizeStyles[size].fontSize};
    font-weight: ${sizeStyles[size].fontWeight};
    line-height: 1;
  `}
`;
