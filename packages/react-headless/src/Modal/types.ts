import type { ReactNode } from "react";

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  trigger?: ReactNode;
  children: ReactNode;
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
}
