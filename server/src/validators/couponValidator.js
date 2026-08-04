import { z } from "zod";

export const couponSchema = z.object({
  code: z
    .string()
    .trim()
    .min(3, "Coupon code must be at least 3 characters.")
    .max(30)
    .transform((value) => value.toUpperCase()),

  description: z
    .string()
    .trim()
    .min(5)
    .max(500),

  type: z.enum(["percentage", "fixed"]),

  value: z
    .number()
    .positive("Discount value must be greater than 0."),

  minimumOrderAmount: z
    .number()
    .min(0),

  maximumDiscount: z
    .number()
    .min(0),

  usageLimit: z
    .number()
    .int()
    .min(1),

  usagePerUser: z
    .number()
    .int()
    .min(1),

  startDate: z.string(),

  expiryDate: z.string(),

  active: z.boolean(),
});