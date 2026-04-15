export function assertFieldContext<T>(context: T | null, missingContextMessage: string): T {
  if (!context) {
    throw new Error(missingContextMessage);
  }
  return context;
}

export function getAriaRequired(required?: boolean) {
  if (required === undefined) {
    return undefined;
  }
  return required ? "true" : "false";
}
