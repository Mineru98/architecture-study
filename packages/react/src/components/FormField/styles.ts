import styled from "styled-components";

interface StyledFormFieldProps {
  $hasError: boolean;
}

export const StyledFormField = styled.div<StyledFormFieldProps>`
  display: flex;
  flex-direction: column;
  gap: var(--va-space-4);
`;

export const StyledLabel = styled.label<{ $isRequired?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: var(--va-space-2);
  color: var(--va-foreground-default);
  font-size: var(--va-font-size-14);
  font-weight: var(--va-font-weight-500);
  line-height: 1.2;

  ${({ $isRequired }) =>
    $isRequired &&
    "&::after { content: '*'; color: var(--va-color-gray-700); margin-left: var(--va-space-2); }"}
`;

export const StyledInputSlot = styled.div<{ $hasError: boolean }>`
  display: block;

  & > :where(input, textarea, select) {
    width: 100%;
    border-color: ${({ $hasError }) =>
      $hasError ? "var(--va-color-gray-700)" : "var(--va-border-subtle)"};
    outline: none;
  }

  & > :where(input, textarea, select):focus-visible {
    border-color: var(--va-focus-ring-color);
    box-shadow: 0 0 0 var(--va-focus-ring-width) var(--va-focus-ring-color);
  }
`;

export const StyledDescription = styled.p`
  margin: 0;
  color: var(--va-foreground-muted);
  font-size: var(--va-font-size-12);
  line-height: 1.4;
`;

export const StyledError = styled.p`
  margin: 0;
  color: var(--va-color-gray-900);
  font-size: var(--va-font-size-12);
  line-height: 1.4;
  font-weight: var(--va-font-weight-500);
`;
