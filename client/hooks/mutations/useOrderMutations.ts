import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

import adminOrderService from "@/services/adminOrderService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useUpdateOrderStatus() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: string;
    }) =>
      adminOrderService.updateStatus(
        id,
        status
      ),

    onSuccess(_, variables) {
      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.orders,
      });

      queryClient.invalidateQueries({
        queryKey:
          QUERY_KEYS.order(
            variables.id
          ),
      });

      toast.success(
        "Order updated successfully."
      );
    },

    onError(error: any) {
      toast.error(
        error.message ??
          "Failed to update order."
      );
    },
  });
}