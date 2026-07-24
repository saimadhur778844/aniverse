import Link from "next/link";
import clsx from "clsx";

import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  centered?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  viewAllHref,
  viewAllLabel = "View All",
  centered = false,
}: SectionHeaderProps) {
  return (
    <header
      className={clsx(
        styles.header,
        centered &&
          styles.centered
      )}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>
          {title}
        </h2>

        {subtitle && (
          <p className={styles.subtitle}>
            {subtitle}
          </p>
        )}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className={styles.link}
          aria-label={`${viewAllLabel}: ${title}`}
        >
          {viewAllLabel}
          <span
            className={styles.arrow}
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      )}
    </header>
  );
}