import { Product } from "@/types/product";

import ProductCard from "../ProductCard";

import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export default function ProductGrid({
  products,
  className,
}: ProductGridProps) {
  if (!products.length) {
    return null;
  }

  return (
    <section
      className={`${styles.grid} ${className ?? ""}`}
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