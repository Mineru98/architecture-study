import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface SegmentedControlRootProps {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface SegmentedControlItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}
