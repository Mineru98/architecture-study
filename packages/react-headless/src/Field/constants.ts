export const FIELD_DISPLAY_NAMES = {
  root: "FieldRoot",
  label: "FieldLabel",
  description: "FieldDescription",
  errorMessage: "FieldErrorMessage",
} as const;

export const FIELD_ERROR_MESSAGES = {
  missingContext: "Field components must be used within FieldRoot.",
  alertRole: "alert",
  requiredTrue: "true",
  requiredFalse: "false",
} as const;
