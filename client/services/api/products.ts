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
    const response = await api.get(
      "/products",
      {
        params: filters,
      }
    );

    return response.data.data;
  }

  async getProduct(
    slug: string
  ): Promise<ProductResponse> {
    const response = await api.get(
      `/products/${slug}`
    );

    return response.data.data;
  }

  async createProduct(
    product: Partial<Product>
  ): Promise<ProductResponse> {
    const response = await api.post(
      "/products",
      product
    );

    return response.data.data;
  }

  async updateProduct(
    id: string,
    product: Partial<Product>
  ): Promise<ProductResponse> {
    const response = await api.patch(
      `/products/${id}`,
      product
    );

    return response.data.data;
  }

  async deleteProduct(
    id: string
  ): Promise<void> {
    await api.delete(
      `/products/${id}`
    );
  }
}

export default new ProductsApi();