import { TextareaHTMLAttributes } from "react";
import clsx from "clsx";

interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export default function TextArea({
  className,
  error = false,
  ...props
}: TextAreaProps) {
  return (
    <textarea
      className={clsx(
        "textarea-field",
        error && "input-error",
        className
      )}
      {...props}
    />
  );
}