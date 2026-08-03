import type { User } from "./user";

export interface Review {
  _id: string;

  product: string;

  order: string;

  user: User;

  rating: number;

  title: string;

  comment: string;

  images: string[];

  verifiedPurchase: boolean;

  visible: boolean;

  createdAt: string;

  updatedAt: string;
}

export interface CreateReviewPayload {
  product: string;

  order: string;

  rating: number;

  title: string;

  comment: string;

  images?: string[];
}