import type { TextFieldProps } from "./types";

export function TextField(props: TextFieldProps) {
  return <input type="text" {...props} />;
}

export type { TextFieldProps } from "./types";
