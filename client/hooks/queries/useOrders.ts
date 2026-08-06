import { useQuery } from "@tanstack/react-query";

import adminOrderService, {
  GetOrdersParams,
} from "@/services/adminOrderService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useOrders(
  params: GetOrdersParams
) {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.orders,
      params,
    ],

    queryFn: () =>
      adminOrderService.getOrders(
        params
      ),

    placeholderData: (previousData) =>
      previousData,
  });
}

export function useOrder(
  id: string
) {
  return useQuery({
    queryKey: QUERY_KEYS.order(id),

    queryFn: () =>
      adminOrderService.getOrder(id),

    enabled: !!id,
  });
}