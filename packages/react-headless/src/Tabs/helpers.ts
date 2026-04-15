export function isTabActive(currentValue: string | undefined, value: string): boolean {
  return currentValue === value;
}

export function createTabSelectHandler(setValue: (value: string) => void, tabValue: string) {
  return () => setValue(tabValue);
}
