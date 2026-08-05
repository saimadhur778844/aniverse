export type CouponType =
  | "percentage"
  | "fixed";

export interface Coupon {
  _id: string;

  code: string;

  description: string;

  type: CouponType;

  value: number;

  minimumOrderAmount: number;

  maximumDiscount: number;

  usageLimit: number;

  usedCount: number;

  usagePerUser: number;

  startDate: string;

  expiryDate: string;

  active: boolean;

  createdAt: string;

  updatedAt: string;
}