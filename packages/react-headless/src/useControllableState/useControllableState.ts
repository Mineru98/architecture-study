import { useCallback, useMemo, useState } from "react";

export interface UseControllableStateParams<T> {
  value?: T;
  defaultValue: T;
  onChange?: (nextValue: T) => void;
}

export function useControllableState<T>({ value, defaultValue, onChange }: UseControllableStateParams<T>) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange],
  );

  return useMemo(() => [currentValue, setValue] as const, [currentValue, setValue]);
}
