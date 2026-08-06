import { z } from "zod";

import { productSchema } from "./schema";

export type ProductFormValues = z.infer<
  typeof productSchema
>;

export interface ProductFormProps {
  initialValues?: Partial<ProductFormValues>;

  onSubmit(
    values: ProductFormValues
  ): Promise<void>;

  loading?: boolean;
}