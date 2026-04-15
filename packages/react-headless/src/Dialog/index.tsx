import { forwardRef } from "react";
import { Portal } from "../Portal";
import { DialogContext, useDialog, useDialogContext } from "./hooks";
import type {
  DialogBackdropProps,
  DialogCloseButtonProps,
  DialogContentProps,
  DialogDescriptionProps,
  DialogPositionerProps,
  DialogRootProps,
  DialogTitleProps,
  DialogTriggerProps,
} from "./types";

export function DialogRoot({ children, ...props }: DialogRootProps) {
  const api = useDialog(props);
  return <DialogContext.Provider value={api}>{children}</DialogContext.Provider>;
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>((props, ref) => {
  const api = useDialogContext();
  return <button type="button" ref={ref} aria-expanded={api.open} onClick={() => api.setOpen(true)} {...props} />;
});
DialogTrigger.displayName = "DialogTrigger";

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(({ onClick, ...props }, ref) => {
  const api = useDialogContext();
  if (!api.open) {
    return null;
  }
  return (
    <Portal>
      <div
        ref={ref}
        onClick={(event) => {
          onClick?.(event);
          if (api.closeOnInteractOutside && event.target === event.currentTarget) {
            api.setOpen(false);
          }
        }}
        {...props}
      />
    </Portal>
  );
});
DialogBackdrop.displayName = "DialogBackdrop";

export const DialogPositioner = forwardRef<HTMLDivElement, DialogPositionerProps>((props, ref) => {
  const api = useDialogContext();
  if (!api.open) {
    return null;
  }
  return (
    <Portal>
      <div ref={ref} {...props} />
    </Portal>
  );
});
DialogPositioner.displayName = "DialogPositioner";

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
  const api = useDialogContext();
  if (!api.open) {
    return null;
  }
  return <div ref={ref} role="dialog" aria-modal="true" {...props} />;
});
DialogContent.displayName = "DialogContent";

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => <h2 ref={ref} {...props} />);
DialogTitle.displayName = "DialogTitle";

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>((props, ref) => <p ref={ref} {...props} />);
DialogDescription.displayName = "DialogDescription";

export const DialogCloseButton = forwardRef<HTMLButtonElement, DialogCloseButtonProps>(({ onClick, ...props }, ref) => {
  const api = useDialogContext();
  return (
    <button
      type="button"
      ref={ref}
      onClick={(event) => {
        onClick?.(event);
        api.setOpen(false);
      }}
      {...props}
    />
  );
});
DialogCloseButton.displayName = "DialogCloseButton";

export type {
  DialogRootProps,
  DialogTriggerProps,
  DialogBackdropProps,
  DialogPositionerProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseButtonProps,
} from "./types";
export { useDialogContext } from "./hooks";
