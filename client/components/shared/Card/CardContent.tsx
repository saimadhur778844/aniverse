import { HTMLAttributes } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props
  extends HTMLAttributes<HTMLDivElement> {}

export default function CardContent({
  children,
  className,
  ...props
}: Props) {
  return (
    <div
      className={twMerge(
        clsx(
          "p-6",
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}