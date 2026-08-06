import { HTMLAttributes } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props
  extends HTMLAttributes<HTMLParagraphElement> {}

export default function CardDescription({
  children,
  className,
  ...props
}: Props) {
  return (
    <p
      className={twMerge(
        clsx(
          "mt-2 text-sm text-zinc-400",
          className
        )
      )}
      {...props}
    >
      {children}
    </p>
  );
}