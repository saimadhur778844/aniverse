"use client";

import { useState } from "react";
import styles from "./PasswordField.module.css";

interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export default function PasswordField({
  id,
  label,
  value,
  placeholder,
  error,
  required = false,
  autoComplete = "current-password",
  onChange,
}: PasswordFieldProps) {
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
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          onChange={onChange}
          className={styles.input}
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