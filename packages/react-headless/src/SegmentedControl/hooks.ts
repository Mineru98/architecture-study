import { createContext, useContext } from "react";
import { SEGMENTED_CONTROL_CONTEXT_ERROR } from "./constants";

export interface SegmentedControlContextValue {
  value?: string;
  setValue: (value: string) => void;
}

export const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

export function useSegmentedControlContext() {
  const context = useContext(SegmentedControlContext);
  if (!context) {
    throw new Error(SEGMENTED_CONTROL_CONTEXT_ERROR);
  }
  return context;
}
