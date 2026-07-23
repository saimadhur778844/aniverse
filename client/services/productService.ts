import api from "@/lib/axios";
import { Product } from "@/types/product";

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

export interface ProductPayload {
  name: string;
  anime: string;
  category: string;
  description: string;
  image: string;
  price: number;
  stock: number;
  featured: boolean;
}

const getProducts = async (
  params?: GetProductsParams
): Promise<ProductResponse> => {
  const { data } = await api.get("/products", {
    params,
  });

  return data;
};

const getProduct = async (slug: string) => {
  const response = await api.get(`/products/${slug}`);
  return response.data;
};

// const getProduct = async (slug: string): Promise<Product> => {
//   const { data } = await api.get(`/products/${slug}`);
//   return data.product;
// };

const createProduct = async (
  product: ProductPayload
) => {
  const { data } = await api.post("/products", product);
  return data;
};

const updateProduct = async (
  id: string,
  product: ProductPayload
) => {
  const { data } = await api.put(
    `/products/${id}`,
    product
  );  

  return data;
};

const deleteProduct = async (id: string) => {
  const { data } = await api.delete(`/products/${id}`);
  return data;
};

/* ---------- Named Exports (Backward Compatible) ---------- */

export {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

/* ---------- Service Object (Recommended) ---------- */

export const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};