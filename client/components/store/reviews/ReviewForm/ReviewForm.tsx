"use client";

import {
  useState,
} from "react";

import Button from "@/components/shared/Button";

import reviewService from "@/services/reviewService";
import { notify } from "@/utils/toast";

interface Props {
  productId: string;

  orderId: string;

  onSuccess?: () => void;
}

export default function ReviewForm({
  productId,
  orderId,
  onSuccess,
}: Props) {
  const [
    rating,
    setRating,
  ] = useState(5);

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    comment,
    setComment,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  async function submit() {
    if (!comment.trim()) {
      notify.error("Please enter your review.");
      return;
    }

    try {
      setLoading(true);

      await reviewService.createReview(
        {
          product: productId,

          order: orderId,

          rating,

          title,

          comment,

          images: [],
        }
      );

      setTitle("");

      setComment("");

      setRating(5);

      notify.success("Review submitted successfully.");

      onSuccess?.();
    } catch (error: any) {
      notify.error(
        error?.response?.data
          ?.message ??
          "Unable to submit review."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-3xl border border-[#343454] bg-[#171726] p-8">

      <h2 className="text-2xl font-bold text-white">

        Write a Review

      </h2>

      <div className="mt-6 flex gap-2">

        {[1, 2, 3, 4, 5].map(
          (star) => (
            <button
              key={star}
              onClick={() =>
                setRating(star)
              }
              className={`text-3xl ${
                star <= rating
                  ? "text-yellow-400"
                  : "text-zinc-600"
              }`}
            >
              ★
            </button>
          )
        )}

      </div>

      <input
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        placeholder="Review title"
        className="mt-6 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
      />

      <textarea
        rows={5}
        value={comment}
        onChange={(e) =>
          setComment(
            e.target.value
          )
        }
        placeholder="Share your experience..."
        className="mt-4 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white"
      />

      <Button
        className="mt-6"
        onClick={submit}
        disabled={loading}
      >
        {loading
          ? "Submitting..."
          : "Submit Review"}
      </Button>

    </div>
  );
}