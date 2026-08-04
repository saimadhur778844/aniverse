"use client";

import { useState } from "react";

import LoadingButton from "@/components/auth/LoadingButton/LoadingButton";

import reviewService from "@/services/reviewService";
import { notify } from "@/utils/toast";

interface Props {
  productId: string;
  orderId: string;
  onSuccess?: () => void;
}

const MAX_COMMENT_LENGTH = 500;

export default function ReviewForm({
  productId,
  orderId,
  onSuccess,
}: Props) {
  const [rating, setRating] = useState(5);

  const [title, setTitle] = useState("");

  const [comment, setComment] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function submit() {
    if (!comment.trim()) {
      notify.error(
        "Please enter your review."
      );
      return;
    }

    const loadingToast =
      notify.loading(
        "Submitting your review..."
      );

    try {
      setLoading(true);

      await reviewService.createReview({
        product: productId,

        order: orderId,

        rating,

        title,

        comment,

        images: [],
      });

      notify.dismiss(
        loadingToast
      );

      setTitle("");

      setComment("");

      setRating(5);

      notify.success(
        "Thank you! Your review has been submitted."
      );

      onSuccess?.();
    } catch (error: any) {
      notify.dismiss(
        loadingToast
      );

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

      <p className="mt-2 text-sm text-gray-400">
        Share your experience to help
        other anime collectors.
      </p>

      {/* Rating */}

      <div className="mt-8">

        <p className="mb-3 text-sm font-medium text-gray-300">
          Your Rating
        </p>

        <div className="flex gap-2">

          {[1, 2, 3, 4, 5].map(
            (star) => (
              <button
                key={star}
                type="button"
                disabled={loading}
                onClick={() =>
                  setRating(star)
                }
                className={`text-4xl transition-all duration-200 hover:scale-110 ${
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

      </div>

      {/* Title */}

      <input
        value={title}
        disabled={loading}
        maxLength={100}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        placeholder="Review title (optional)"
        className="mt-8 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-white outline-none transition focus:border-pink-500 disabled:opacity-60"
      />

      {/* Comment */}

      <textarea
        rows={6}
        value={comment}
        disabled={loading}
        maxLength={
          MAX_COMMENT_LENGTH
        }
        onChange={(e) =>
          setComment(
            e.target.value
          )
        }
        placeholder="Share your experience with this product..."
        className="mt-5 w-full resize-none rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none transition focus:border-pink-500 disabled:opacity-60"
      />

      <div className="mt-2 flex justify-end">

        <span className="text-xs text-gray-500">
          {comment.length}/
          {MAX_COMMENT_LENGTH}
        </span>

      </div>

      <LoadingButton
        type="button"
        loading={loading}
        loadingText="Submitting Review..."
        onClick={submit}
        className="mt-8 w-full rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 py-4 font-semibold text-white transition hover:from-pink-500 hover:to-purple-500"
      >
        Submit Review
      </LoadingButton>

    </div>
  );
}