export const DIALOG_DISPLAY_NAMES = {
  trigger: "DialogTrigger",
  backdrop: "DialogBackdrop",
  positioner: "DialogPositioner",
  content: "DialogContent",
  title: "DialogTitle",
  description: "DialogDescription",
  closeButton: "DialogCloseButton",
} as const;

export const DIALOG_DEFAULT_ROLES = {
  dialog: "dialog",
} as const;

export const DIALOG_DEFAULT_ARIA = {
  modal: "true",
} as const;

export const DIALOG_DEFAULT_OPTIONS = {
  closeOnEscape: true,
  closeOnInteractOutside: true,
} as const;

export const DIALOG_ERROR_MESSAGES = {
  missingContext: "Dialog components must be used within DialogRoot.",
} as const;
