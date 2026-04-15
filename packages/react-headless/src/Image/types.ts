import type { ImgHTMLAttributes, ReactNode } from "react";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
}
