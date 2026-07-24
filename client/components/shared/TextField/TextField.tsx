import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface TextFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export default function TextField({
  className,
  error = false,
  ...props
}: TextFieldProps) {
  return (
    <input
      className={clsx(
        "input-field",
        error && "input-error",
        className
      )}
      {...props}
    />
  );
}