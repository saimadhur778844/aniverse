"use client";

import styles from "./StockBadge.module.css";

interface StockBadgeProps {
  stock: number;
}

export default function StockBadge({
  stock,
}: StockBadgeProps) {
  const inStock = stock > 0;

  return (
    <span
      className={`${styles.badge} ${
        inStock ? styles.inStock : styles.outOfStock
      }`}
    >
      {inStock ? "● In Stock" : "● Out of Stock"}
    </span>
  );
}