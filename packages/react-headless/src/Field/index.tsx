import { forwardRef } from "react";
import { FieldContext, useFieldContext } from "./hooks";
import { FIELD_DISPLAY_NAMES, FIELD_ERROR_MESSAGES } from "./constants";
import { getAriaRequired } from "./helpers";
import type { FieldDescriptionProps, FieldErrorMessageProps, FieldLabelProps, FieldRootProps } from "./types";

export function FieldRoot({ children, id, required, invalid, ...props }: FieldRootProps) {
  return (
    <FieldContext.Provider value={{ id, required, invalid }}>
      <div {...props}>{children}</div>
    </FieldContext.Provider>
  );
}

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(({ children, ...props }, ref) => {
  const context = useFieldContext();
  return (
    <label ref={ref} htmlFor={context.id} aria-required={getAriaRequired(context.required)} {...props}>
      {children}
    </label>
  );
});
FieldLabel.displayName = FIELD_DISPLAY_NAMES.label;

export const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>((props, ref) => {
  return <p ref={ref} {...props} />;
});
FieldDescription.displayName = FIELD_DISPLAY_NAMES.description;

export const FieldErrorMessage = forwardRef<HTMLParagraphElement, FieldErrorMessageProps>((props, ref) => {
  const context = useFieldContext();
  if (!context?.invalid) {
    return null;
  }
  return <p ref={ref} role={FIELD_ERROR_MESSAGES.alertRole} {...props} />;
});
FieldErrorMessage.displayName = FIELD_DISPLAY_NAMES.errorMessage;

export type { FieldRootProps, FieldLabelProps, FieldDescriptionProps, FieldErrorMessageProps } from "./types";
export { useFieldContext } from "./hooks";
