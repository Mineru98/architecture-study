import {
  StyledDescription,
  StyledError,
  StyledFormField,
  StyledInputSlot,
  StyledLabel,
} from "./styles";
import type { FormFieldProps } from "./types";

export function FormField({
  label,
  description,
  error,
  required = false,
  fieldId,
  children,
  ...props
}: FormFieldProps) {
  const hasError = Boolean(error);

  return (
    <StyledFormField $hasError={hasError} {...props}>
      {label ? (
        <StyledLabel htmlFor={fieldId} $isRequired={required}>
          {label}
        </StyledLabel>
      ) : null}
      <StyledInputSlot $hasError={hasError}>{children}</StyledInputSlot>
      {description ? <StyledDescription>{description}</StyledDescription> : null}
      {error ? (
        <StyledError role="alert" aria-live="polite">
          {error}
        </StyledError>
      ) : null}
    </StyledFormField>
  );
}

export type { FormFieldProps } from "./types";
