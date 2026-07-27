"use client";

import { useState } from "react";

import Button from "@/components/shared/Button";

import styles from "./ReviewForm.module.css";

interface ReviewFormProps {
  onSubmit: (review: {
    rating: number;
    title: string;
    review: string;
  }) => void;
}

export default function ReviewForm({
  onSubmit,
}: ReviewFormProps) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!title.trim() || !review.trim()) {
      return;
    }

    onSubmit({
      rating,
      title: title.trim(),
      review: review.trim(),
    });

    setRating(5);
    setTitle("");
    setReview("");
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <h2 className={styles.heading}>
        Write a Review
      </h2>

      <div className={styles.rating}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`${styles.star} ${
              star <= rating
                ? styles.active
                : ""
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <input
        className={styles.input}
        placeholder="Review title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className={styles.textarea}
        placeholder="Tell other collectors about this product..."
        rows={6}
        value={review}
        onChange={(e) =>
          setReview(e.target.value)
        }
      />

      <Button type="submit">
        Submit Review
      </Button>
    </form>
  );
}