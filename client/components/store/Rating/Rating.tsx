"use client";

import styles from "./Rating.module.css";

interface RatingProps {
  rating?: number;
  reviewCount?: number;
}

export default function Rating({
  rating = 0,
  reviewCount,
}: RatingProps) {
  return (
    <div
      className={styles.rating}
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
    >
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, index) => {
          const fill =
            Math.max(
              0,
              Math.min(1, rating - index)
            ) * 100;

          return (
            <span
              key={index}
              className={styles.star}
            >
              <span className={styles.empty}>
                ★
              </span>

              <span
                className={styles.filled}
                style={{
                  width: `${fill}%`,
                }}
              >
                ★
              </span>
            </span>
          );
        })}
      </div>

      <span className={styles.value}>
        {rating.toFixed(1)}
      </span>

      {reviewCount !== undefined && (
        <span className={styles.reviews}>
          ({reviewCount} reviews)
        </span>
      )}
    </div>
  );
}