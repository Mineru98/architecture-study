import type { AvatarProps } from "./types";

export function Avatar({ fallback, alt, src, ...props }: AvatarProps) {
  if (!src && fallback) {
    return <span aria-label={alt}>{fallback}</span>;
  }
  if (!src) {
    return null;
  }
  return <img alt={alt} src={src} {...props} />;
}

export type { AvatarProps } from "./types";
