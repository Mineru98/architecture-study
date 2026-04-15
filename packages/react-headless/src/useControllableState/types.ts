export interface UseControllableStateParams<T> {
  value?: T;
  defaultValue: T;
  onChange?: (nextValue: T) => void;
}

export type UseControllableStateResult<T> = readonly [T, (nextValue: T) => void];
