import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import productsApi from "@/services/api/products";

import { productKeys } from "./queryKeys";

export default function useCreateProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      productsApi.createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          productKeys.all,
      });

      toast.success(
        "Product created successfully."
      );
    },

    onError: (
      error: unknown
    ) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to create product."
      );
    },
  });
}