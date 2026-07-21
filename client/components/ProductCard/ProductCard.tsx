import Image from "next/image";
import Button from "@/components/Button";
import { Product } from "@/types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <span>⭐ {product.rating}</span>

          <span
            className={
              product.inStock ? styles.inStock : styles.outOfStock
            }
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <h3>{product.name}</h3>

        <p className={styles.anime}>{product.anime}</p>

        <p className={styles.price}>
          ₹{product.price.toLocaleString()}
        </p>

        <Button>Add to Cart</Button>
      </div>
    </div>
  );
}