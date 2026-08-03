"use client";

import {
  useEffect,
  useState,
} from "react";

import ReviewCard from "../ReviewCard/ReviewCard";

import reviewService from "@/services/reviewService";

import type { Review } from "@/types/review";

interface Props {
  productId: string;
}

export default function ReviewList({
  productId,
}: Props) {
  const [
    reviews,
    setReviews,
  ] = useState<Review[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  async function loadReviews() {
    try {
      setLoading(true);

      const data =
        await reviewService.getProductReviews(
          productId
        );

      setReviews(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="py-12 text-center text-zinc-400">
        Loading reviews...
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="py-12 text-center text-zinc-400">
        No reviews yet.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {reviews.map(
        (review) => (
          <ReviewCard
            key={review._id}
            review={review}
          />
        )
      )}
    </div>
  );
}