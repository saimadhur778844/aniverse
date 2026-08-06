import { ButtonSize, ButtonVariant } from "./types";

export const variantClasses: Record<
  ButtonVariant,
  string
> = {
  primary:
    "bg-pink-600 text-white hover:bg-pink-500 focus:ring-pink-500",

  secondary:
    "bg-zinc-800 text-white hover:bg-zinc-700 focus:ring-zinc-600",

  outline:
    "border border-zinc-700 bg-transparent text-white hover:bg-zinc-800",

  ghost:
    "bg-transparent text-white hover:bg-zinc-800",

  danger:
    "bg-red-600 text-white hover:bg-red-500 focus:ring-red-500",

  success:
    "bg-green-600 text-white hover:bg-green-500 focus:ring-green-500",

  warning:
    "bg-yellow-500 text-black hover:bg-yellow-400 focus:ring-yellow-500",
};

export const sizeClasses: Record<
  ButtonSize,
  string
> = {
  xs: "h-8 px-3 text-xs",

  sm: "h-9 px-4 text-sm",

  md: "h-10 px-5 text-sm",

  lg: "h-12 px-6 text-base",

  xl: "h-14 px-8 text-lg",
};