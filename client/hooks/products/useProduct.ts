import { useQuery } from "@tanstack/react-query";

import productsApi from "@/services/api/products";

import { productKeys } from "./queryKeys";

export default function useProduct(
  slug: string
) {
  return useQuery({
    queryKey:
      productKeys.detail(slug),

    queryFn: () =>
      productsApi.getProduct(
        slug
      ),

    enabled: !!slug,
  });
}