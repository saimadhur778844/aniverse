import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Product name must be at least 3 characters.")
    .max(150),

  anime: z
    .string()
    .trim()
    .min(2, "Anime name is required.")
    .max(100),

  category: z
    .string()
    .min(1, "Category is required."),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters.")
    .max(5000),

  image: z
    .string()
    .url("Invalid image URL."),

  price: z
    .number({
      invalid_type_error: "Price must be a number.",
    })
    .positive("Price must be greater than zero."),

  stock: z
    .number({
      invalid_type_error: "Stock must be a number.",
    })
    .int()
    .min(0),

  featured: z
    .boolean()
    .optional(),
});