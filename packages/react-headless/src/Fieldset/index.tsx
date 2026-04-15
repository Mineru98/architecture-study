import type { FieldsetLegendProps, FieldsetRootProps } from "./types";

export function FieldsetRoot(props: FieldsetRootProps) {
  return <fieldset {...props} />;
}

export function FieldsetLegend(props: FieldsetLegendProps) {
  return <legend {...props} />;
}

export type { FieldsetRootProps, FieldsetLegendProps } from "./types";
