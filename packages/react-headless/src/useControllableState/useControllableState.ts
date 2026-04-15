import { useCallback, useMemo, useState } from "react";
import type { UseControllableStateParams, UseControllableStateResult } from "./types";
import { getCurrentValue, isControlledValue } from "./helpers";
import { DEFAULT_CONTROLLED_PARAM } from "./constants";

export function useControllableState<T>({
  value = DEFAULT_CONTROLLED_PARAM,
  defaultValue,
  onChange,
}: UseControllableStateParams<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = isControlledValue(value);
  const currentValue = getCurrentValue(value, uncontrolledValue);

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return useMemo(() => [currentValue, setValue] as UseControllableStateResult<T>, [currentValue, setValue]);
}
