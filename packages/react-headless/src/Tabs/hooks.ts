import { createContext, useContext } from "react";
import { TABS_CONTEXT_ERROR } from "./constants";

export interface TabsContextValue {
  value?: string;
  setValue: (value: string) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(TABS_CONTEXT_ERROR);
  }
  return context;
}
