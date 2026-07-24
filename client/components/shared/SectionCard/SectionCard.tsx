import { HTMLAttributes } from "react";
import clsx from "clsx";

interface SectionCardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-5",
  md: "p-6",
  lg: "p-8",
};

export default function SectionCard({
  className,
  children,
  padding = "lg",
  ...props
}: SectionCardProps) {
  return (
    <section
      className={clsx(
        "card",
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}