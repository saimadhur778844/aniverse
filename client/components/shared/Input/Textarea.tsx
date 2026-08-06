"use client";

import {
  forwardRef,
} from "react";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import {
  TextareaProps,
} from "./types";

import {
  inputBaseClasses,
} from "./inputVariants";

const Textarea =
  forwardRef<
    HTMLTextAreaElement,
    TextareaProps
  >(
    (
      {
        label,

        error,

        helperText,

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

          <textarea
            ref={ref}
            className={twMerge(
              clsx(
                inputBaseClasses,

                "min-h-32 resize-none",

                error &&
                  "border-red-500",

                className
              )
            )}
            {...props}
          />

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

Textarea.displayName =
  "Textarea";

export default Textarea;