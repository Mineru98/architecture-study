import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { PortalProps } from "./types";

export function Portal({ children, container }: PortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const target = useMemo(() => {
    if (container instanceof HTMLElement && container.isConnected) return container;
    if (typeof document === "undefined") return null;
    return document.body;
  }, [container]);

  if (!mounted || !target) return null;
  return createPortal(children, target);
}

export type { PortalProps } from "./types";
