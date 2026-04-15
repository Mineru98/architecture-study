import type { FieldsetHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface FieldsetRootProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  children: ReactNode;
}

export interface FieldsetLegendProps extends HTMLAttributes<HTMLLegendElement> {
  children: ReactNode;
}
