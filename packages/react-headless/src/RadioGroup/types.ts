import type { InputHTMLAttributes, ReactNode } from "react";

export interface RadioGroupRootProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

export interface RadioGroupItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "name" | "checked"> {
  value: string;
}
