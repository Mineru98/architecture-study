import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface FieldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  invalid?: boolean;
}
