import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import productsApi from "@/services/api/products";

import { productKeys } from "./queryKeys";

import {
  Product,
} from "@/types/product";

interface UpdatePayload {
  id: string;

  product: Partial<Product>;
}

export default function useUpdateProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      product,
    }: UpdatePayload) =>
      productsApi.updateProduct(
        id,
        product
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          productKeys.all,
      });

      toast.success(
        "Product updated successfully."
      );
    },

    onError: (
      error: unknown
    ) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update product."
      );
    },
  });
}