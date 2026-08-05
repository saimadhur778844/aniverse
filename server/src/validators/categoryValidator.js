import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters.")
    .max(100),

  description: z
    .string()
    .trim()
    .min(5, "Description must be at least 5 characters.")
    .max(1000),

  image: z
    .string()
    .url("Invalid image URL.")
    .optional(),

  featured: z
    .boolean()
    .optional(),
});