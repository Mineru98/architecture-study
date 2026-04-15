import { forwardRef } from "react";
import { FieldContext, useFieldContext } from "./hooks";
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
    <label ref={ref} htmlFor={context?.id} aria-required={context?.required} {...props}>
      {children}
    </label>
  );
});
FieldLabel.displayName = "FieldLabel";

export const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>((props, ref) => {
  return <p ref={ref} {...props} />;
});
FieldDescription.displayName = "FieldDescription";

export const FieldErrorMessage = forwardRef<HTMLParagraphElement, FieldErrorMessageProps>((props, ref) => {
  const context = useFieldContext();
  if (!context?.invalid) {
    return null;
  }
  return <p ref={ref} role="alert" {...props} />;
});
FieldErrorMessage.displayName = "FieldErrorMessage";

export type { FieldRootProps, FieldLabelProps, FieldDescriptionProps, FieldErrorMessageProps } from "./types";
export { useFieldContext } from "./hooks";
