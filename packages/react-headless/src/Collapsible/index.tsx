import { useControllableState } from "../useControllableState";
import { CollapsibleContext, useCollapsibleContext } from "./hooks";
import type { CollapsibleContentProps, CollapsibleRootProps, CollapsibleTriggerProps } from "./types";
import { DEFAULT_OPEN } from "./constants";
import { toggleOpenValue } from "./helpers";

export function CollapsibleRoot({ children, open, defaultOpen = DEFAULT_OPEN, onOpenChange }: CollapsibleRootProps) {
  const [currentOpen, setOpen] = useControllableState<boolean>({ value: open, defaultValue: defaultOpen, onChange: onOpenChange });
  return <CollapsibleContext.Provider value={{ open: currentOpen, setOpen }}>{children}</CollapsibleContext.Provider>;
}

export function CollapsibleTrigger({ onClick, ...props }: CollapsibleTriggerProps) {
  const api = useCollapsibleContext();
  return (
    <button
      type="button"
      aria-expanded={api.open}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        api.setOpen(toggleOpenValue(api.open));
      }}
    />
  );
}

export function CollapsibleContent(props: CollapsibleContentProps) {
  const api = useCollapsibleContext();
  if (!api.open) return null;
  return <div {...props} />;
}

export type { CollapsibleRootProps, CollapsibleTriggerProps, CollapsibleContentProps } from "./types";
export { useCollapsibleContext } from "./hooks";
