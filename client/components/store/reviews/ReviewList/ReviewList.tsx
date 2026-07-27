"use client";

import { useMemo, useState } from "react";

import ReviewCard from "../ReviewCard/ReviewCard";

import styles from "./ReviewList.module.css";

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  review: string;
  date: string;
  verified?: boolean;
  helpful?: number;
}

interface ReviewListProps {
  reviews: Review[];
}

type SortOption =
  | "newest"
  | "oldest"
  | "highest"
  | "lowest"
  | "helpful";

export default function ReviewList({
  reviews,
}: ReviewListProps) {
  const [sort, setSort] =
    useState<SortOption>("newest");

  const sortedReviews = useMemo(() => {
    const items = [...reviews];

    switch (sort) {
      case "highest":
        return items.sort(
          (a, b) => b.rating - a.rating
        );

      case "lowest":
        return items.sort(
          (a, b) => a.rating - b.rating
        );

      case "helpful":
        return items.sort(
          (a, b) =>
            (b.helpful ?? 0) -
            (a.helpful ?? 0)
        );

      case "oldest":
        return items.sort(
          (a, b) =>
            new Date(a.date).getTime() -
            new Date(b.date).getTime()
        );

      case "newest":
      default:
        return items.sort(
          (a, b) =>
            new Date(b.date).getTime() -
            new Date(a.date).getTime()
        );
    }
  }, [reviews, sort]);

  if (!reviews.length) {
    return (
      <div className={styles.empty}>
        <h3>No Reviews Yet</h3>

        <p>
          Be the first customer to review
          this product.
        </p>
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2>
          Customer Reviews (
          {reviews.length})
        </h2>

        <select
          value={sort}
          onChange={(e) =>
            setSort(
              e.target.value as SortOption
            )
          }
          className={styles.select}
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="highest">
            Highest Rating
          </option>

          <option value="lowest">
            Lowest Rating
          </option>

          <option value="helpful">
            Most Helpful
          </option>
        </select>
      </div>

      <div className={styles.list}>
        {sortedReviews.map((review) => (
          <ReviewCard
            key={review.id}
            author={review.author}
            avatar={review.avatar}
            rating={review.rating}
            title={review.title}
            review={review.review}
            date={review.date}
            verified={review.verified}
            helpful={review.helpful}
          />
        ))}
      </div>
    </section>
  );
}