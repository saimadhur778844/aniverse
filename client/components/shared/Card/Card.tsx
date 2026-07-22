import { HTMLAttributes } from "react";
import styles from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function Card({
  children,
  hover = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`
        ${styles.card}
        ${hover ? styles.hover : ""}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}