import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(3, "Product name is required"),

  slug: z
    .string()
    .min(3),

  shortDescription: z
    .string()
    .max(200),

  description: z
    .string()
    .min(10),

  category: z.string(),

  anime: z.string(),

  brand: z.string(),

  sku: z.string(),

mrp: z.coerce
  .number()
  .positive("MRP must be greater than 0"),

sellingPrice: z.coerce
  .number()
  .positive("Selling price must be greater than 0"),

costPrice: z.coerce
  .number()
  .min(0),

  discount: z.coerce.number().min(0),

  tax: z.coerce.number().min(0),

stock: z.coerce
  .number()
  .int()
  .min(0),

minimumStock: z.coerce
  .number()
  .int()
  .min(0),

  trackInventory: z.boolean(),

  continueSelling: z.boolean(),

  featured: z.boolean(),

  published: z.boolean(),

  visibility: z.enum([
  "public",
  "private",
]),

  trending: z.boolean(),

  newArrival: z.boolean(),

metaTitle: z
  .string()
  .max(
    60,
    "Maximum 60 characters."
  ),

metaDescription: z
  .string()
  .max(
    160,
    "Maximum 160 characters."
  ),

keywords: z.string(),


  images: z
  .array(
    z.object({
      url: z.string(),
      isPrimary: z.boolean(),
    })
  )
  .min(
    1,
    "At least one image is required."
  ),
});