import type { HTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";

export interface FieldRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  id?: string;
  required?: boolean;
  invalid?: boolean;
}

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export interface FieldErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}
