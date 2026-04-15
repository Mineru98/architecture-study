import type { CheckboxProps } from "./types";

export function Checkbox(props: CheckboxProps) {
  return <input type="checkbox" {...props} />;
}

export type { CheckboxProps } from "./types";
