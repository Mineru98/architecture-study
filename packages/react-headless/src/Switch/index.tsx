import type { SwitchProps } from "./types";

export function Switch({ checked, defaultChecked, disabled, ...props }: SwitchProps) {
  const ariaChecked = checked ?? defaultChecked;
  return <input type="checkbox" role="switch" aria-checked={ariaChecked} disabled={disabled} {...props} />;
}

export type { SwitchProps } from "./types";
