"use client";

import { Loader2 } from "lucide-react";
import clsx from "clsx";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingText?: string;
}

export default function LoadingButton({
  children,
  loading = false,
  loadingText = "Please wait...",
  className,
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold transition-all duration-200",
        "disabled:cursor-not-allowed disabled:opacity-70",
        className
      )}
    >
      {loading && (
        <Loader2
          size={18}
          className="animate-spin"
        />
      )}

      {loading ? loadingText : children}
    </button>
  );
}