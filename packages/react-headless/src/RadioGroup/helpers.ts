export function isRadioChecked(currentValue: string | undefined, itemValue: string): boolean {
  return currentValue === itemValue;
}

export function createRadioSelectHandler(setValue: (value: string) => void, itemValue: string) {
  return () => setValue(itemValue);
}
