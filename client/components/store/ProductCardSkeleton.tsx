import Card from "@/components/shared/Card";

import styles from "./ProductCardSkeleton.module.css";

export default function ProductCardSkeleton() {
  return (
    <Card className={styles.card}>
      <div className={styles.image} />

      <div className={styles.content}>
        <div className={styles.category} />

        <div className={styles.title} />

        <div className={styles.titleSmall} />

        <div className={styles.rating} />

        <div className={styles.stock} />

        <div className={styles.footer}>
          <div className={styles.price} />

          <div className={styles.button} />
        </div>
      </div>
    </Card>
  );
}