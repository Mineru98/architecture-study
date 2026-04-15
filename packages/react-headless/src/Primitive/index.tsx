import { cloneElement, forwardRef, isValidElement, type ElementType, type ReactElement } from "react";
import type { PrimitiveProps, PrimitivePropsWithRef } from "./types";

function createPrimitive<E extends ElementType>(node: E) {
  const Node = forwardRef<HTMLElement, PrimitivePropsWithRef<E>>((props, ref) => {
    const { asChild, children, ...rest } = props as PrimitivePropsWithRef<ElementType>;

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement, { ...rest, ref });
    }

    const Comp = node as ElementType;
    return <Comp ref={ref} {...rest}>{children}</Comp>;
  });

  Node.displayName = `Primitive.${String(node)}`;
  return Node;
}

export const Primitive = {
  div: createPrimitive("div"),
  span: createPrimitive("span"),
  button: createPrimitive("button"),
  label: createPrimitive("label"),
  input: createPrimitive("input"),
  p: createPrimitive("p"),
  h2: createPrimitive("h2"),
};

export type { PrimitiveProps, PrimitivePropsWithRef } from "./types";
