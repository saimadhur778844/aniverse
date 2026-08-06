import { HTMLAttributes } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props
  extends HTMLAttributes<HTMLDivElement> {}

export default function CardHeader({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        clsx(
          "border-b border-zinc-800 px-6 py-5",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}