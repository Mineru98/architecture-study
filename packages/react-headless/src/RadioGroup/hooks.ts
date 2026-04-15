import { createContext, useContext } from "react";
import { RADIOGROUP_CONTEXT_ERROR } from "./constants";

export interface RadioGroupContextValue {
  value?: string;
  setValue: (value: string) => void;
  name?: string;
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error(RADIOGROUP_CONTEXT_ERROR);
  }
  return context;
}
