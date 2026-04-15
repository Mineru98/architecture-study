import {
  DialogBackdrop,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../Dialog";
import type { ModalProps } from "./types";

export function Modal({
  open,
  defaultOpen,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  closeOnEscape = true,
  closeOnInteractOutside = true,
}: ModalProps) {
  return (
    <DialogRoot
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      closeOnEscape={closeOnEscape}
      closeOnInteractOutside={closeOnInteractOutside}
    >
      {trigger ? <DialogTrigger>{trigger}</DialogTrigger> : null}
      <DialogBackdrop className="va-dialog-backdrop" />
      <DialogPositioner className="va-dialog-positioner">
        <DialogContent className="va-dialog-content">
          {title ? <DialogTitle>{title}</DialogTitle> : null}
          {description ? <DialogDescription>{description}</DialogDescription> : null}
          {children}
          <DialogCloseButton>Close</DialogCloseButton>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}

export type { ModalProps } from "./types";
