"use client";

import { HTMLAttributes } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface CardProps
  extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({
  children,
  className,
  hover = false,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm transition-all duration-200",
          hover &&
            "hover:border-pink-500/40 hover:shadow-lg hover:shadow-pink-500/5",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}