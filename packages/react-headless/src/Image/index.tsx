import type { ImageProps } from "./types";

export function Image({ src, alt, fallback, ...props }: ImageProps) {
  if (!src && fallback) return <>{fallback}</>;
  if (!src) return null;
  return <img src={src} alt={alt} {...props} />;
}

export type { ImageProps } from "./types";
