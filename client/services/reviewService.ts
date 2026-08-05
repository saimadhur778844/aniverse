import api from "./api";

import type {
  Review,
  CreateReviewPayload,
} from "@/types/review";

interface ReviewsResponse {
  success: boolean;
  reviews: Review[];
}

interface ReviewResponse {
  success: boolean;
  review: Review;
}

class ReviewService {
  async getProductReviews(
    productId: string
  ): Promise<Review[]> {
    const { data } =
      await api.get<ReviewsResponse>(
        `/reviews/product/${productId}`
      );

    return data.reviews;
  }

  async createReview(
    payload: CreateReviewPayload
  ): Promise<Review> {
    const { data } =
      await api.post<ReviewResponse>(
        "/reviews",
        payload
      );

    return data.review;
  }

  async updateReview(
    id: string,
    payload: Partial<CreateReviewPayload>
  ): Promise<Review> {
    const { data } =
      await api.put<ReviewResponse>(
        `/reviews/${id}`,
        payload
      );

    return data.review;
  }

  async deleteReview(
    id: string
  ) {
    await api.delete(
      `/reviews/${id}`
    );
  }
}

const reviewService =
  new ReviewService();

export default reviewService;