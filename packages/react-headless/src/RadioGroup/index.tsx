import { useControllableState } from "../useControllableState";
import { RadioGroupContext, useRadioGroupContext } from "./hooks";
import type { RadioGroupItemProps, RadioGroupRootProps } from "./types";
import { RADIOGROUP_DEFAULT_VALUE } from "./constants";
import { createRadioSelectHandler, isRadioChecked } from "./helpers";

export function RadioGroupRoot({ children, value, defaultValue = RADIOGROUP_DEFAULT_VALUE, onValueChange, name }: RadioGroupRootProps) {
  const [currentValue, setValue] = useControllableState<string>({ value, defaultValue, onChange: onValueChange });
  return <RadioGroupContext.Provider value={{ value: currentValue, setValue, name }}>{children}</RadioGroupContext.Provider>;
}

export function RadioGroupItem({ value, onChange, ...props }: RadioGroupItemProps) {
  const api = useRadioGroupContext();
  const handleChange = createRadioSelectHandler(api.setValue, value);
  return (
    <input
      type="radio"
      name={api.name}
      checked={isRadioChecked(api.value, value)}
      value={value}
      {...props}
      onChange={(event) => {
        onChange?.(event);
        handleChange();
      }}
    />
  );
}

export type { RadioGroupRootProps, RadioGroupItemProps } from "./types";
export { useRadioGroupContext } from "./hooks";
