"use client";

import {
  forwardRef,
} from "react";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import {
  InputProps,
} from "./types";

import {
  inputBaseClasses,
} from "./inputVariants";

const Input = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      label,

      error,

      helperText,

      leftIcon,

      rightIcon,

      className,

      ...props
    },

    ref
  ) => {
    return (
      <div className="space-y-2">

        {label && (
          <label className="text-sm font-medium text-zinc-300">
            {label}
          </label>
        )}

        <div className="relative">

          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={twMerge(
              clsx(
                inputBaseClasses,

                leftIcon &&
                  "pl-10",

                rightIcon &&
                  "pr-10",

                error &&
                  "border-red-500 focus:border-red-500",

                className
              )
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {rightIcon}
            </div>
          )}

        </div>

        {error ? (
          <p className="text-sm text-red-500">
            {error}
          </p>
        ) : (
          helperText && (
            <p className="text-sm text-zinc-500">
              {helperText}
            </p>
          )
        )}

      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;