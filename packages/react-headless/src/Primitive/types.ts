import type { ElementType } from "react";

export interface PrimitiveProps {
  asChild?: boolean;
}

export type PrimitivePropsWithRef<E extends ElementType> = React.ComponentPropsWithRef<E> & PrimitiveProps;
