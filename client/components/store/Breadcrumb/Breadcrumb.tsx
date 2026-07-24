"use client";

import Link from "next/link";

import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({
  items,
}: BreadcrumbProps) {
  return (
    <nav
      className={styles.breadcrumb}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <span
          key={`${item.label}-${index}`}
          className={styles.item}
        >
          {item.href ? (
            <Link
              href={item.href}
              className={styles.link}
            >
              {item.label}
            </Link>
          ) : (
            <span className={styles.current}>
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <span className={styles.separator}>
              /
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}