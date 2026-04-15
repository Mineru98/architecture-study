import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";

export interface DialogRootProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
}

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export interface DialogBackdropProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export interface DialogPositionerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export interface DialogCloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}
