import { HTMLAttributes } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props
  extends HTMLAttributes<HTMLDivElement> {}

export default function CardFooter({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        clsx(
          "flex items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}