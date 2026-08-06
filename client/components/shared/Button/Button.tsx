"use client";

import {
  forwardRef,
} from "react";

import clsx from "clsx";

import { twMerge } from "tailwind-merge";

import {
  Loader2,
} from "lucide-react";

import {
  ButtonProps,
} from "./types";

import {
  variantClasses,
  sizeClasses,
} from "./buttonVariants";

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      variant = "primary",

      size = "md",

      loading = false,

      disabled = false,

      fullWidth = false,

      leftIcon,

      rightIcon,

      children,

      className,

      ...props
    },

    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={
          disabled ||
          loading
        }
        className={twMerge(
          clsx(
            "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",

            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950",

            "disabled:pointer-events-none disabled:opacity-60",

            variantClasses[
              variant
            ],

            sizeClasses[size],

            fullWidth &&
              "w-full",

            className
          )
        )}
        {...props}
      >
        {loading ? (
          <Loader2
            className="h-4 w-4 animate-spin"
          />
        ) : (
          leftIcon
        )}

        <span>{children}</span>

        {!loading &&
          rightIcon}
      </button>
    );
  }
);

Button.displayName =
  "Button";

export default Button;