import React from 'react';

type Listener = () => void;

export function atom<T>(initial: T) {
  let value = initial;
  const listeners = new Set<Listener>();
  return {
    get: () => value,
    set: (v: T | ((prev: T) => T)) => {
      value = typeof v === 'function' ? (v as (p: T) => T)(value) : v;
      listeners.forEach((l) => l());
    },
    subscribe: (fn: Listener) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
  };
}

export function useAtom<T>(
  a: ReturnType<typeof atom<T>>
): [T, (v: T | ((prev: T) => T)) => void] {
  const [state, setState] = React.useState(() => a.get());
  React.useEffect(() => a.subscribe(() => setState(a.get())), [a]);
  return [state, a.set];
}
