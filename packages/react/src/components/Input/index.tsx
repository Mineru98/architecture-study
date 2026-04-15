import { StyledInput } from "./styles";
import type { InputProps } from "./types";

export function Input(props: InputProps) {
  return <StyledInput {...props} />;
}

export type { InputProps } from "./types";
