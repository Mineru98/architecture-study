import { useControllableState } from "../useControllableState";
import { TabsContext, useTabsContext } from "./hooks";
import type { TabsContentProps, TabsListProps, TabsRootProps, TabsTriggerProps } from "./types";
import { TABS_DEFAULT_VALUE } from "./constants";
import { createTabSelectHandler, isTabActive } from "./helpers";

export function TabsRoot({ children, value, defaultValue = TABS_DEFAULT_VALUE, onValueChange }: TabsRootProps) {
  const [currentValue, setValue] = useControllableState<string>({ value, defaultValue, onChange: onValueChange });
  return <TabsContext.Provider value={{ value: currentValue, setValue }}>{children}</TabsContext.Provider>;
}

export function TabsList(props: TabsListProps) {
  return <div role="tablist" {...props} />;
}

export function TabsTrigger({ value, onClick, ...props }: TabsTriggerProps) {
  const api = useTabsContext();
  const handleClick = createTabSelectHandler(api.setValue, value);
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isTabActive(api.value, value)}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        handleClick();
      }}
    />
  );
}

export function TabsContent({ value, children, ...props }: TabsContentProps) {
  const api = useTabsContext();
  if (!isTabActive(api.value, value)) return null;
  return <div role="tabpanel" {...props}>{children}</div>;
}

export type { TabsRootProps, TabsListProps, TabsTriggerProps, TabsContentProps } from "./types";
export { useTabsContext } from "./hooks";
