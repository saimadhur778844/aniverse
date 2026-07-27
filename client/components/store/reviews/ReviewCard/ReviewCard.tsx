"use client";

import { ThumbsUp } from "lucide-react";

import styles from "./ReviewCard.module.css";

interface ReviewCardProps {
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  review: string;
  date: string;
  verified?: boolean;
  helpful?: number;
}

export default function ReviewCard({
  author,
  avatar,
  rating,
  title,
  review,
  date,
  verified = false,
  helpful = 0,
}: ReviewCardProps) {
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
            <div className={styles.avatarPlaceholder}>
              {author.charAt(0).toUpperCase()}
            </div>
          )}

          <div>
            <h4 className={styles.author}>
              {author}
            </h4>

            {verified && (
              <span className={styles.verified}>
                ✓ Verified Purchase
              </span>
            )}
          </div>
        </div>

        <span className={styles.date}>
          {date}
        </span>
      </div>

      <div className={styles.rating}>
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>

      <h3 className={styles.title}>
        {title}
      </h3>

      <p className={styles.review}>
        {review}
      </p>

      <button className={styles.helpful}>
        <ThumbsUp size={16} />
        Helpful ({helpful})
      </button>
    </article>
  );
}