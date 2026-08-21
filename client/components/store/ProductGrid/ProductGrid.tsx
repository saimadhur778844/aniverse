import { Product } from "@/types/product";

import ProductCard from "../ProductCard";

import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  className?: string;
  horizontalMobile?: boolean;
}

export default function ProductGrid({
  products,
  className,
  horizontalMobile = false,
}: ProductGridProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section
      className={`${styles.grid} ${horizontalMobile ? styles.horizontalMobile : ""} ${className ?? ""}`}
      aria-label="Products"
    >
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </section>
  );
}