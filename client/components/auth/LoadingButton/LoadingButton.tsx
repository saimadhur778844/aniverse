"use client";

import { ButtonHTMLAttributes } from "react";
import styles from "./LoadingButton.module.css";

interface LoadingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function LoadingButton({
  loading = false,
  children,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={styles.button}
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>
          Processing...
        </>
      ) : (
        children
      )}
    </button>
  );
}