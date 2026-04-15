import type { ProgressCircleProps } from "./types";

export function ProgressCircle({ value, max = 100, ...props }: ProgressCircleProps) {
  return <div role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} {...props} />;
}

export type { ProgressCircleProps } from "./types";
