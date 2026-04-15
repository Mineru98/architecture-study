import { useControllableState } from "../useControllableState";
import { SegmentedControlContext, useSegmentedControlContext } from "./hooks";
import type { SegmentedControlItemProps, SegmentedControlRootProps } from "./types";
import { SEGMENTED_CONTROL_DEFAULT_VALUE } from "./constants";
import { createSegmentedSelectHandler, isSegmentedActive } from "./helpers";

export function SegmentedControlRoot({ children, value, defaultValue = SEGMENTED_CONTROL_DEFAULT_VALUE, onValueChange }: SegmentedControlRootProps) {
  const [currentValue, setValue] = useControllableState<string>({ value, defaultValue, onChange: onValueChange });
  return <SegmentedControlContext.Provider value={{ value: currentValue, setValue }}>{children}</SegmentedControlContext.Provider>;
}

export function SegmentedControlItem({ value, onClick, ...props }: SegmentedControlItemProps) {
  const api = useSegmentedControlContext();
  const handleClick = createSegmentedSelectHandler(api.setValue, value);
  return (
    <button
      type="button"
      aria-pressed={isSegmentedActive(api.value, value)}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        handleClick();
      }}
    />
  );
}

export type { SegmentedControlRootProps, SegmentedControlItemProps } from "./types";
export { useSegmentedControlContext } from "./hooks";
