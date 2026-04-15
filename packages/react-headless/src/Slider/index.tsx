import type { SliderProps } from "./types";

export function Slider(props: SliderProps) {
  return <input type="range" {...props} />;
}

export type { SliderProps } from "./types";
