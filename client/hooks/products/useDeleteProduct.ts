import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import productsApi from "@/services/api/products";

import { productKeys } from "./queryKeys";

export default function useDeleteProduct() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn:
      productsApi.deleteProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          productKeys.all,
      });

      toast.success(
        "Product deleted successfully."
      );
    },

    onError: (
      error: unknown
    ) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete product."
      );
    },
  });
}