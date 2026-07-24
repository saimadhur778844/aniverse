import { ReactNode } from "react";
import clsx from "clsx";

import styles from "./Section.module.css";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  container?: boolean;
}

export default function Section({
  children,
  className,
  containerClassName,
  container = true,
}: SectionProps) {
  return (
    <section
      className={clsx(
        styles.section,
        className
      )}
    >
      {container ? (
        <div
          className={clsx(
            styles.container,
            containerClassName
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}