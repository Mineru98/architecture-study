import type { FieldButtonProps } from "./types";

export function FieldButton({ invalid, children, ...props }: FieldButtonProps) {
  return <button type="button" aria-invalid={invalid} {...props}>{children}</button>;
}

export type { FieldButtonProps } from "./types";
