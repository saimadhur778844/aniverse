"use client";

import styles from "./Rating.module.css";

interface RatingProps {
  rating?: number;
}

export default function Rating({
  rating = 0,
}: RatingProps) {
  const fullStars = Math.floor(rating);

  return (
    <div className={styles.rating}>
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={
              index < fullStars
                ? styles.active
                : styles.inactive
            }
          >
            ★
          </span>
        ))}
      </div>

      <span className={styles.value}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
}