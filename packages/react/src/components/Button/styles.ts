import styled, { css } from "styled-components";
import type { ButtonProps } from "./types";

const variantStyles = {
  solid: css`
    background: var(--va-color-bg-strong);
    color: var(--va-color-fg-inverse);
    border: 1px solid var(--va-color-bg-strong);
  `,
  outline: css`
    background: transparent;
    color: var(--va-color-fg-default);
    border: 1px solid var(--va-color-border-strong);
  `,
  ghost: css`
    background: transparent;
    color: var(--va-color-fg-default);
    border: 1px solid transparent;
  `,
};

export const StyledButton = styled.button<Required<Pick<ButtonProps, "variant">>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--va-space-8);
  min-height: 40px;
  padding: 0 var(--va-space-16);
  border-radius: var(--va-radius-round);
  font-size: var(--va-font-size-14);
  font-weight: var(--va-font-weight-500);
  cursor: pointer;
  transition: opacity 120ms ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ variant }) => variantStyles[variant]}
`;
