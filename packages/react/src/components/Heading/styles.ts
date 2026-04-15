import styled from "styled-components";
import type { HeadingProps } from "./types";

const sizeStyles = {
  1: { fontSize: "var(--va-font-size-20)", marginBottom: "var(--va-space-16)" },
  2: { fontSize: "calc(var(--va-font-size-20) * 1)", marginBottom: "var(--va-space-12)" },
  3: { fontSize: "var(--va-font-size-16)", marginBottom: "var(--va-space-12)" },
  4: { fontSize: "var(--va-font-size-14)", marginBottom: "var(--va-space-8)" },
  5: { fontSize: "var(--va-font-size-14)", marginBottom: "var(--va-space-8)" },
  6: { fontSize: "var(--va-font-size-12)", marginBottom: "var(--va-space-4)" },
} as const;

export const StyledHeading = styled.h1<Required<Pick<HeadingProps, "level">>>`
  margin: 0;
  color: var(--va-color-fg-default);
  font-weight: var(--va-font-weight-700);
  line-height: 1.25;
  ${({ level }) => `
    font-size: ${sizeStyles[level].fontSize};
    margin-bottom: ${sizeStyles[level].marginBottom};
  `}
`;
