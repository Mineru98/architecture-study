import type { SnackbarProps } from "./types";

export function Snackbar({ open = true, children, ...props }: SnackbarProps) {
  if (!open) return null;
  return <div role="status" {...props}>{children}</div>;
}

export type { SnackbarProps } from "./types";
