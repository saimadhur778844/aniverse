import { z } from "zod";

export const orderSchema = z.object({
  items: z
    .array(
      z.object({
        product: z.string(),
        quantity: z
          .number()
          .int()
          .positive(),
      })
    )
    .min(1),

  shippingAddress: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    address: z.string().min(5),
    city: z.string().min(2),
    state: z.string().min(2),
    pincode: z.string().min(4),
  }),

  couponCode: z
    .string()
    .optional(),
});