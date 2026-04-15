import type { ImgHTMLAttributes, ReactNode } from "react";

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
}
