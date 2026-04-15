export function isControlledValue<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function getCurrentValue<T>(value: T | undefined, uncontrolledValue: T): T {
  return isControlledValue(value) ? value : uncontrolledValue;
}
