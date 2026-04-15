import { forwardRef } from "react";
import { Portal } from "../Portal";
import { DialogContext, useDialog, useDialogContext } from "./hooks";
import { DIALOG_DISPLAY_NAMES, DIALOG_DEFAULT_ARIA, DIALOG_DEFAULT_ROLES } from "./constants";
import { handleInteractOutsideClick } from "./helpers";
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

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(({ onClick, ...props }, ref) => {
  const api = useDialogContext();
  return (
    <button
      type="button"
      ref={ref}
      aria-expanded={api.open}
      aria-controls={api.contentId}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        api.setOpen(true);
      }}
    />
  );
});
DialogTrigger.displayName = DIALOG_DISPLAY_NAMES.trigger;

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(({ onClick, ...props }, ref) => {
  const api = useDialogContext();
  if (!api.open) {
    return null;
  }
  return (
    <Portal>
      <div
        ref={ref}
        {...props}
        onClick={(event) => {
          onClick?.(event);
          handleInteractOutsideClick(event, api.closeOnInteractOutside, api.setOpen);
        }}
      />
    </Portal>
  );
});
DialogBackdrop.displayName = DIALOG_DISPLAY_NAMES.backdrop;

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
  return (
    <div
      ref={ref}
      id={api.contentId}
      role={DIALOG_DEFAULT_ROLES.dialog}
      aria-modal={DIALOG_DEFAULT_ARIA.modal}
      aria-labelledby={api.titleId}
      aria-describedby={api.descriptionId}
      tabIndex={-1}
      {...props}
    />
  );
});
DialogContent.displayName = DIALOG_DISPLAY_NAMES.content;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => {
  const api = useDialogContext();
  return <h2 ref={ref} id={api.titleId} {...props} />;
});
DialogTitle.displayName = DIALOG_DISPLAY_NAMES.title;

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>((props, ref) => {
  const api = useDialogContext();
  return <p ref={ref} id={api.descriptionId} {...props} />;
});
DialogDescription.displayName = DIALOG_DISPLAY_NAMES.description;

export const DialogCloseButton = forwardRef<HTMLButtonElement, DialogCloseButtonProps>(({ onClick, ...props }, ref) => {
  const api = useDialogContext();
  return (
    <button
      type="button"
      ref={ref}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        api.setOpen(false);
      }}
    />
  );
});
DialogCloseButton.displayName = DIALOG_DISPLAY_NAMES.closeButton;

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
