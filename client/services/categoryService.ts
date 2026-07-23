import api from "@/lib/axios";

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get("/categories");

  // Supports both:
  // [ ... ]
  // { categories: [...] }
  return Array.isArray(data) ? data : data.categories;
};

const createCategory = async (category: Partial<Category>) => {
  const { data } = await api.post("/categories", category);
  return data;
};

const updateCategory = async (
  id: string,
  category: Partial<Category>
) => {
  const { data } = await api.put(`/categories/${id}`, category);
  return data;
};

const deleteCategory = async (id: string) => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
};

/* ---------- Named Exports ---------- */

export {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};

/* ---------- Service Object ---------- */

export const categoryService = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};