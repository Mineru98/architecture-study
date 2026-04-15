import type { Dispatch, MouseEvent } from "react";

export type DialogOpenSetter = (nextOpen: boolean) => void;

export function isEscapeKeyEvent(event: KeyboardEvent): boolean {
  return event.key === "Escape";
}

export function shouldCloseFromInteractOutside(event: MouseEvent<HTMLElement>): boolean {
  return event.target === event.currentTarget;
}

export function handleInteractOutsideClick(
  event: MouseEvent<HTMLElement>,
  closeOnInteractOutside: boolean,
  setOpen: DialogOpenSetter,
) {
  if (closeOnInteractOutside && shouldCloseFromInteractOutside(event)) {
    setOpen(false);
  }
}

export function assertDialogContext<T>(context: T | null, missingContextMessage: string): T {
  if (!context) {
    throw new Error(missingContextMessage);
  }
  return context;
}
