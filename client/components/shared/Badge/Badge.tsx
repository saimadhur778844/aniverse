"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import {
  BadgeProps,
} from "./types";

import {
  badgeVariants,
} from "./badgeVariants";

export default function Badge({
  children,

  variant = "primary",

  rounded = true,

  className,
}: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center px-3 py-1 text-xs font-medium",

          rounded
            ? "rounded-full"
            : "rounded-md",

          badgeVariants[
            variant
          ],

          className
        )
      )}
    >
      {children}
    </span>
  );
}