"use client";

import styles from "./RatingSummary.module.css";

interface RatingSummaryProps {
  average: number;
  totalReviews: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export default function RatingSummary({
  average,
  totalReviews,
  distribution,
}: RatingSummaryProps) {
  const max = Math.max(...Object.values(distribution), 1);

  return (
    <section className={styles.container}>
      <div className={styles.overview}>
        <h2 className={styles.average}>
          {average.toFixed(1)}
        </h2>

        <div className={styles.stars}>
          {"★".repeat(Math.round(average))}
          {"☆".repeat(5 - Math.round(average))}
        </div>

        <p className={styles.total}>
          {totalReviews} Reviews
        </p>
      </div>

      <div className={styles.breakdown}>
        {[5, 4, 3, 2, 1].map((star) => (
          <div
            key={star}
            className={styles.row}
          >
            <span className={styles.label}>
              {star} ★
            </span>

            <div className={styles.bar}>
              <div
                className={styles.fill}
                style={{
                  width: `${
                    (distribution[
                      star as keyof typeof distribution
                    ] /
                      max) *
                    100
                  }%`,
                }}
              />
            </div>

            <span className={styles.count}>
              {
                distribution[
                  star as keyof typeof distribution
                ]
              }
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}