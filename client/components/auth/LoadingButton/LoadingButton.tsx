"use client";

import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./LoadingButton.module.css";

interface LoadingButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export default function LoadingButton({
  loading = false,
  loadingText = "Processing...",
  children,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={`${styles.button} ${className ?? ""}`}
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}