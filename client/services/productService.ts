import api from "@/lib/axios";
import { Product } from "@/types/product";

interface GetProductsParams {
  featured?: boolean;
  category?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export const getProducts = async (
  params?: GetProductsParams
): Promise<Product[]> => {
  const response = await api.get("/products", {
    params,
  });

  return response.data.products;
};

export const getProduct = async (slug: string) => {
  const { data } = await api.get(`/products/${slug}`);
  return data;
};

export const createProduct = async (product: any) => {
  const { data } = await api.post("/products", product);
  return data;
};

export const updateProduct = async (
  id: string,
  product: any
) => {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
};

export const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

export const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};