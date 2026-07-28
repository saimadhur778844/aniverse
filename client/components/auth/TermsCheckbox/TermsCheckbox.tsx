"use client";

import {
  forwardRef,
  InputHTMLAttributes,
} from "react";

import styles from "./TermsCheckbox.module.css";

interface TermsCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TermsCheckbox = forwardRef<
  HTMLInputElement,
  TermsCheckboxProps
>(
  (
    {
      id = "terms",
      label = "I agree to the Terms & Conditions and Privacy Policy.",
      error,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={styles.wrapper}>
        <label
          htmlFor={id}
          className={styles.label}
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            className={className}
            {...props}
          />

          <span>
            {label.split("Terms & Conditions")[0]}

            <a href="/terms">
              Terms & Conditions
            </a>

            {" and "}

            <a href="/privacy">
              Privacy Policy
            </a>
            .
          </span>
        </label>

        {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

TermsCheckbox.displayName = "TermsCheckbox";

export default TermsCheckbox;