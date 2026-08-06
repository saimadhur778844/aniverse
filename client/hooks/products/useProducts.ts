
import productsApi from "@/services/api/products";

import {
  ProductFilters,
} from "@/types/product";

import { productKeys } from "./queryKeys";
import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

export default function useProducts(
  filters: ProductFilters = {}
) {
  return useQuery({
    queryKey:
      productKeys.list(filters),

    queryFn: () =>
      productsApi.getProducts(
        filters
      ),

    placeholderData: keepPreviousData,  });
}   