import { createContext, useContext } from "react";
import { FIELD_ERROR_MESSAGES } from "./constants";
import { assertFieldContext } from "./helpers";

export interface FieldContextValue {
  id?: string;
  required?: boolean;
  invalid?: boolean;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  return assertFieldContext(useContext(FieldContext), FIELD_ERROR_MESSAGES.missingContext);
}
