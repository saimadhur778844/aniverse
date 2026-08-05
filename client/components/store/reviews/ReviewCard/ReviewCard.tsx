"use client";

import { ThumbsUp } from "lucide-react";

import styles from "./ReviewCard.module.css";

import type { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  const author =
    review.user?.name ?? "Anonymous";

  const avatar = (review.user as any)?.avatar;

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.user}>

          {avatar ? (
            <img
              src={avatar}
              alt={author}
              className={styles.avatar}
            />
          ) : (
            <div
              className={
                styles.avatarPlaceholder
              }
            >
              {author
                .charAt(0)
                .toUpperCase()}
            </div>
          )}

          <div>
            <h4 className={styles.author}>
              {author}
            </h4>

            {review.verifiedPurchase && (
              <span
                className={
                  styles.verified
                }
              >
                ✓ Verified Purchase
              </span>
            )}
          </div>
        </div>

        <span className={styles.date}>
          {new Date(
            review.createdAt
          ).toLocaleDateString()}
        </span>
      </div>

      <div className={styles.rating}>
        {"★".repeat(review.rating)}
        {"☆".repeat(
          5 - review.rating
        )}
      </div>

      <h3 className={styles.title}>
        {review.title ||
          "Customer Review"}
      </h3>

      <p className={styles.review}>
        {review.comment}
      </p>

      {/* Images */}

      {review.images &&
        review.images.length >
          0 && (
          <div
            className={
              styles.images
            }
          >
            {review.images.map(
              (image) => (
                <img
                  key={image}
                  src={image}
                  alt="Review"
                  className={
                    styles.reviewImage
                  }
                />
              )
            )}
          </div>
        )}

      <button
        className={
          styles.helpful
        }
      >
        <ThumbsUp size={16} />
        Helpful
      </button>
    </article>
  );
}