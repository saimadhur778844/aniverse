"use client";

import clsx from "clsx";

import styles from "./StockBadge.module.css";

interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({
  stock,
}: StockBadgeProps) {
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  const label = isOutOfStock
    ? "Out of Stock"
    : isLowStock
      ? `Only ${stock} left`
      : "In Stock";

  return (
    <span
      className={clsx(
        styles.badge,
        isOutOfStock
          ? styles.outOfStock
          : isLowStock
            ? styles.lowStock
            : styles.inStock
      )}
      aria-label={label}
    >
      <span className={styles.dot} />

      {label}
    </span>
  );
}