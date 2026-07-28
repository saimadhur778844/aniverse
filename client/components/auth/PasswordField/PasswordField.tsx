"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  useState,
} from "react";

import styles from "./PasswordField.module.css";

interface PasswordFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordField = forwardRef<
  HTMLInputElement,
  PasswordFieldProps
>(
  (
    {
      id,
      label,
      error,
      className,
      type,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

    return (
      <div className={styles.field}>
        <label
          htmlFor={id}
          className={styles.label}
        >
          {label}
        </label>

        <div
          className={`${styles.inputWrapper} ${
            error ? styles.errorBorder : ""
          }`}
        >
          <input
            ref={ref}
            id={id}
            type={
              showPassword
                ? "text"
                : "password"
            }
            className={`${styles.input} ${
              className ?? ""
            }`}
            {...props}
          />

          <button
            type="button"
            className={styles.toggle}
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>

        {error && (
          <span className={styles.error}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

PasswordField.displayName =
  "PasswordField";

export default PasswordField;