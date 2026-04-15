import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface CollapsibleRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {}
