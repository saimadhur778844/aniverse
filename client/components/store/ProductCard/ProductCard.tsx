import Link from "next/link";
import Image from "next/image";

import Card from "@/components/shared/Card";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";

import { Product } from "@/types/product";

import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const categoryName =
  typeof product.category === "string"
    ? product.category
    : product.category?.name ?? "Uncategorized";

  const rating = product.rating ?? 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className={styles.link}
      aria-label={product.name}
    >
      <Card hover className={styles.card}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.image}
          />

          {product.featured && (
            <Badge variant="warning" className={styles.badge}>
              Featured
            </Badge>
          )}

          <button
            type="button"
            className={styles.wishlistButton}
            aria-label="Add to wishlist"
          >
            ♡
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.category}>{categoryName}</p>

          <h3 className={styles.name}>{product.name}</h3>

          <div className={styles.rating}>
            <span aria-hidden="true">⭐</span>
            <span>{rating.toFixed(1)}</span>
          </div>

          <div className={styles.footer}>
            <span className={styles.price}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <Button
              variant="primary"
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}