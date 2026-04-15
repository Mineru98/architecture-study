import { createContext, useCallback, useContext, useEffect } from "react";
import { useControllableState } from "../useControllableState";
import type { DialogRootProps } from "./types";

export interface DialogContextValue {
  open: boolean;
  setOpen: (nextOpen: boolean) => void;
  closeOnEscape: boolean;
  closeOnInteractOutside: boolean;
}

export const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog({ open, defaultOpen = false, onOpenChange, closeOnEscape = true, closeOnInteractOutside = true }: Omit<DialogRootProps, "children">) {
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
      if (event.key === "Escape") {
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
  };
}

export function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within DialogRoot.");
  }
  return context;
}
