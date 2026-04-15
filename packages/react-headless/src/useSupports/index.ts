export function useSupports() {
  return {
    canUseDOM: typeof window !== "undefined" && typeof document !== "undefined",
  };
}
