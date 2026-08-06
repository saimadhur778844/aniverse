import api from "./api";

import type { Product } from "@/types/product";

export interface GetProductsParams {
  featured?: boolean;
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export interface ProductResponse {
  success: boolean;
  total: number;
  page: number;
  totalPages: number;
  products: Product[];
}

export interface SingleProductResponse {
  success: boolean;
  product: Product;
}

export interface ProductPayload {
  name: string;
  anime: string;
  category: string;
  description: string;
  image: string;
  mrp: number;
  sellingPrice: number;
  stock: number;
  featured: boolean;
}

class ProductService {
  async getProducts(
    params?: GetProductsParams
  ): Promise<ProductResponse> {
    const { data } = await api.get<ProductResponse>(
      "/products",
      {
        params,
      }
    );

    return data;
  }

  async getProduct(
    slug: string
  ): Promise<Product> {
    const { data } =
      await api.get<SingleProductResponse>(
        `/products/${slug}`
      );

    return data.product;
  }

  async createProduct(
    product: ProductPayload
  ): Promise<Product> {
    const { data } =
      await api.post<SingleProductResponse>(
        "/products",
        product
      );

    return data.product;
  }

  async updateProduct(
    id: string,
    product: ProductPayload
  ): Promise<Product> {
    const { data } =
      await api.put<SingleProductResponse>(
        `/products/${id}`,
        product
      );

    return data.product;
  }

  async deleteProduct(
    id: string
  ): Promise<void> {
    await api.delete(`/products/${id}`);
  }
}

export const productService =
  new ProductService();

export default productService;