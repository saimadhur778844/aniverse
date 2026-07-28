"use client";

import styles from "./TermsCheckbox.module.css";

interface Props {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export default function TermsCheckbox({
  checked,
  onChange,
  error,
}: Props) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) =>
            onChange(e.target.checked)
          }
        />

        <span>
          I agree to the{" "}
          <a href="/terms">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="/privacy">
            Privacy Policy
          </a>.
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