import type { HTMLAttributes, ReactNode } from "react";

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  fieldId?: string;
  children: ReactNode;
}
