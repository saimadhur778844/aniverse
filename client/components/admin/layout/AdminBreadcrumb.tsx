"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";

import styles from "./AdminBreadcrumb.module.css";

export default function AdminBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .slice(1);

  return (
    <div className={styles.breadcrumb}>
      <Link
        href="/admin/dashboard"
        className={styles.item}
      >
        <Home size={16} />
      </Link>

      {segments.map((segment, index) => {
        const href =
          "/" +
          ["admin", ...segments.slice(0, index + 1)].join("/");

        const label =
          segment.charAt(0).toUpperCase() +
          segment.slice(1);

        const last =
          index === segments.length - 1;

        return (
          <div
            key={href}
            className={styles.segment}
          >
            <ChevronRight size={16} />

            {last ? (
              <span className={styles.current}>
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className={styles.item}
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}