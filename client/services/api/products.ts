import api from "@/lib/axios";

import type {
  Product,
  ProductFilters,
  ProductResponse,
  ProductsResponse,
} from "@/types/product";

class ProductsApi {
  async getProducts(
    filters: ProductFilters = {}
  ): Promise<ProductsResponse> {
    const { data } = await api.get(
      "/products",
      {
        params: filters,
      }
    );

    return data;
  }

  async getProduct(
    slug: string
  ): Promise<ProductResponse> {
    const { data } = await api.get(
      `/products/${slug}`
    );

    return data;
  }

  async createProduct(
    product: Partial<Product>
  ): Promise<ProductResponse> {
    const { data } = await api.post(
      "/products",
      product
    );

    return data;
  }

  async updateProduct(
    id: string,
    product: Partial<Product>
  ): Promise<ProductResponse> {
    const { data } = await api.patch(
      `/products/${id}`,
      product
    );

    return data;
  }

  async deleteProduct(
    id: string
  ) {
    const { data } =
      await api.delete(
        `/products/${id}`
      );

    return data;
  }
}

export default new ProductsApi();