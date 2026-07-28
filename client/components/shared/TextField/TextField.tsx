"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useId,
} from "react";
import clsx from "clsx";

interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  containerClassName?: string;
}

const TextField = forwardRef<
  HTMLInputElement,
  TextFieldProps
>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      className,
      containerClassName,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div
        className={clsx(
          "form-field",
          containerClassName
        )}
      >
        {label && (
          <label
            htmlFor={inputId}
            className="form-label"
          >
            {label}

            {required && (
              <span
                aria-hidden="true"
                style={{
                  color: "var(--color-primary)",
                  marginLeft: 4,
                }}
              >
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={clsx(
            "input-field",
            error && "input-error",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          {...props}
        />

        {helperText && !error && (
          <small
            id={`${inputId}-helper`}
            className="form-helper"
          >
            {helperText}
          </small>
        )}

        {error && (
          <small
            id={`${inputId}-error`}
            className="form-error"
          >
            {error}
          </small>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;