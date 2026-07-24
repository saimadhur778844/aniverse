"use client";

import { Product } from "@/types/product";
import StockBadge from "../StockBadge";

import styles from "./ProductMeta.module.css";

interface ProductMetaProps {
  product: Product;
}

export default function ProductMeta({
  product,
}: ProductMetaProps) {
  const category =
    typeof product.category === "string"
      ? product.category
      : product.category.name;

  return (
    <div className={styles.meta}>
      <div className={styles.row}>
        <span className={styles.label}>Anime</span>
        <span>{product.anime}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Category</span>
        <span>{category}</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Availability</span>
        <StockBadge stock={product.stock} />
      </div>
    </div>
  );
}