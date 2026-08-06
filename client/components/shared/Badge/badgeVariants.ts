import { BadgeVariant } from "./types";

export const badgeVariants: Record<
  BadgeVariant,
  string
> = {
  primary:
    "bg-pink-600/20 text-pink-400 border border-pink-500/30",

  secondary:
    "bg-zinc-700/40 text-zinc-300 border border-zinc-600",

  success:
    "bg-green-500/15 text-green-400 border border-green-500/30",

  danger:
    "bg-red-500/15 text-red-400 border border-red-500/30",

  warning:
    "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",

  info:
    "bg-sky-500/15 text-sky-400 border border-sky-500/30",

  outline:
    "border border-zinc-600 text-zinc-300",
};