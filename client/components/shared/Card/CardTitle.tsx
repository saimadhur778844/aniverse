import { HTMLAttributes } from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface Props
  extends HTMLAttributes<HTMLHeadingElement> {}

export default function CardTitle({
  children,
  className,
  ...props
}: Props) {
  return (
    <h3
      className={twMerge(
        clsx(
          "text-xl font-semibold text-white",
          className
        )
      )}
      {...props}
    >
      {children}
    </h3>
  );
}