import { createContext, useContext } from "react";
import { COLLAPSIBLE_CONTEXT_ERROR } from "./constants";

export interface CollapsibleContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

export function useCollapsibleContext() {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error(COLLAPSIBLE_CONTEXT_ERROR);
  }
  return context;
}
