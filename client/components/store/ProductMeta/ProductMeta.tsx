"use client";

import { useMemo } from "react";

import { Product } from "@/types/product";

import StockBadge from "../StockBadge";

import styles from "./ProductMeta.module.css";

interface ProductMetaProps {
  product: Product;
}

export default function ProductMeta({
  product,
}: ProductMetaProps) {
  const category = useMemo(() => {
    return typeof product.category === "string"
      ? product.category
      : product.category.name;
  }, [product.category]);

  return (
    <dl className={styles.meta}>
      <div className={styles.row}>
        <dt className={styles.label}>Anime</dt>
        <dd className={styles.value}>
          {product.anime}
        </dd>
      </div>

      <div className={styles.row}>
        <dt className={styles.label}>Category</dt>
        <dd className={styles.value}>
          {category}
        </dd>
      </div>

      <div className={styles.row}>
        <dt className={styles.label}>
          Availability
        </dt>

        <dd className={styles.value}>
          <StockBadge stock={product.stock} />
        </dd>
      </div>
    </dl>
  );
}