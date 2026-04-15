export function isSegmentedActive(currentValue: string | undefined, itemValue: string): boolean {
  return currentValue === itemValue;
}

export function createSegmentedSelectHandler(setValue: (value: string) => void, itemValue: string) {
  return () => setValue(itemValue);
}
