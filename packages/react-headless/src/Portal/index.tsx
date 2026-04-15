import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: ReactNode;
  container?: HTMLElement | null;
}

export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const target = useMemo(() => {
    if (container) {
      return container;
    }
    if (typeof document === "undefined") {
      return null;
    }
    return document.body;
  }, [container]);

  if (!mounted || !target) {
    return null;
  }

  return createPortal(children, target);
}
