import { z } from "zod";

export const reviewSchema = z.object({
  product: z.string().min(1),

  order: z.string().min(1),

  rating: z
    .number()
    .int()
    .min(1)
    .max(5),

  title: z
    .string()
    .trim()
    .min(3)
    .max(150),

  comment: z
    .string()
    .trim()
    .min(10)
    .max(2000),

  images: z
    .array(z.string().url())
    .optional(),
});