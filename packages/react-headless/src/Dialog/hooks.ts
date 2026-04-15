import { createContext, useCallback, useContext, useEffect, useId } from "react";
import { useControllableState } from "../useControllableState";
import { DIALOG_DEFAULT_OPTIONS, DIALOG_ERROR_MESSAGES } from "./constants";
import { assertDialogContext, isEscapeKeyEvent } from "./helpers";
import type { DialogRootProps } from "./types";

export interface DialogContextValue {
  open: boolean;
  setOpen: (nextOpen: boolean) => void;
  closeOnEscape: boolean;
  closeOnInteractOutside: boolean;
  contentId: string;
  titleId: string;
  descriptionId: string;
}

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog({ open, defaultOpen = false, onOpenChange, closeOnEscape = true, closeOnInteractOutside = true }: Omit<DialogRootProps, "children">) {
  const contentId = useId();
  const titleId = useId();
  const descriptionId = useId();
  closeOnEscape = closeOnEscape ?? DIALOG_DEFAULT_OPTIONS.closeOnEscape;
  closeOnInteractOutside = closeOnInteractOutside ?? DIALOG_DEFAULT_OPTIONS.closeOnInteractOutside;

  const [currentOpen, setCurrentOpen] = useControllableState<boolean>({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const setOpen = useCallback((nextOpen: boolean) => {
    setCurrentOpen(nextOpen);
  }, [setCurrentOpen]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    if (!currentOpen || !closeOnEscape) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEscapeKeyEvent(event)) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEscape, currentOpen, setOpen]);

  return {
    open: currentOpen,
    setOpen,
    closeOnEscape,
    closeOnInteractOutside,
    contentId,
    titleId,
    descriptionId,
  };
}

export function useDialogContext() {
  const context = useContext(DialogContext);
  return assertDialogContext(context, DIALOG_ERROR_MESSAGES.missingContext);
}
