import { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  children: ReactNode;
}

export default function Section({ children }: SectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {children}
      </div>
    </section>
  );
}