import { z } from "zod";

export const inventoryAdjustmentSchema = z.object({
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number.",
    })
    .int()
    .positive("Quantity must be greater than 0."),

  type: z.enum(["add", "remove"]),

  reason: z
    .string()
    .trim()
    .min(3, "Reason is required.")
    .max(500),
});