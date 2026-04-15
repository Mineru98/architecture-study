import { useControllableState } from "../useControllableState";
import type { ToggleProps } from "./types";
import { TOGGLE_DEFAULT_PRESSED } from "./constants";
import { getNextPressedState } from "./helpers";

export function Toggle({ pressed, defaultPressed = TOGGLE_DEFAULT_PRESSED, onPressedChange, onClick, ...props }: ToggleProps) {
  const [currentPressed, setPressed] = useControllableState<boolean>({ value: pressed, defaultValue: defaultPressed, onChange: onPressedChange });
  return (
    <button
      type="button"
      aria-pressed={currentPressed}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        setPressed(getNextPressedState(currentPressed));
      }}
    />
  );
}

export type { ToggleProps } from "./types";
